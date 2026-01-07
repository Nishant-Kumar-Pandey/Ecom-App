import express from "express";
import fs from "fs";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import sendMail from "../controllers/mailController.js";
import User from "../Schema/User.js";
import upload from "../config/multer.js";
import { error } from "console";
dotenv.config();

const Authcontroller = express.Router();

// Register
// Register
Authcontroller.post("/register", upload.single("avatar"), async (req, res) => {
  try {
    console.log("Register Request Body:", req.body);
    console.log("Register Request File:", req.file);
    const { username, password } = req.body;
    const email = req.body.email?.toLowerCase();
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    if (req.file) {
      newUser.avatar = `${process.env.BASE_URL}/uploads/${req.file.filename}`;
    }
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//login
Authcontroller.post("/login", async (req, res) => {
  const email = req.body.email?.toLowerCase();
  const { password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //password matching...
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //else assign jwt token....
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    //send mail...
    const subject = "Login Notification";
    const text = `Hi ${user.username},\n\nThis is a notification that your account was just accessed. If this was you, you can safely ignore this email.`;
    await sendMail({ to: user.email, subject, text });

    res.status(200).json({
      message: "Login successful",
      user: {
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        role: user.role || "User"
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//middleware to verify token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "Authorization header missing" });

  const token = authHeader.split(" ")[1];
  if (err) return res.status(403).json({ message: "Invalid token" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

//get all users
Authcontroller.get("/profiles", verifyToken, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
})

//update route
Authcontroller.put("/profile", upload.single("avatar"), async (req, res) => {
  try {
    const { username, email } = req.body; // email is used to find the user
    if (!username || username.trim() === "") {
      return res.status(400).json({ message: "Username cannot be empty" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.username = username;
    if (req.file) {
      if (user.avatar) {
        const oldAvatarPath = user.avatar.split("/uploads/")[1];
        if (oldAvatarPath) {
          const filePath = path.resolve("uploads", oldAvatarPath);
          fs.unlink(filePath, (err) => {
            if (err) console.error("Error deleting old avatar:", err);
          });
        }
      }
      user.avatar = `${process.env.BASE_URL}/uploads/${req.file.filename}`;
    }
    await user.save();
    res.status(200).json({
      message: "Profile updated successfully",
      user: { id: user._id, username: user.username, email: user.email, avatar: user.avatar },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Forgot Password - Send OTP
Authcontroller.post("/forgot-password", async (req, res) => {
  try {
    const email = req.body.email?.toLowerCase();
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found with this email" });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetPasswordOTP = otp;
    user.resetPasswordExpires = Date.now() + 600000; // 10 minutes expiry
    await user.save();

    await sendMail({
      to: user.email,
      subject: "Your Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. It will expire in 10 minutes.`
    });

    res.status(200).json({ message: "OTP sent to registered email" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Reset Password
Authcontroller.post("/reset-password", async (req, res) => {
  try {
    const { otp, newPassword } = req.body;
    const email = req.body.email?.toLowerCase();
    const user = await User.findOne({
      email,
      resetPasswordOTP: otp,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordOTP = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    await sendMail({
      to: user.email,
      subject: "Password Reset Successful",
      text: `Your password has been reset successfully. If this was not you, please contact customer care immediately.`
    });

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default Authcontroller;