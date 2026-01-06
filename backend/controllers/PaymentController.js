import express from "express";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const router = express.Router();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID ? process.env.RAZORPAY_KEY_ID.trim() : "",
    key_secret: process.env.RAZORPAY_KEY_SECRET ? process.env.RAZORPAY_KEY_SECRET.trim() : "",
});

// Create Order
router.post("/create-order", async (req, res) => {
    try {
        console.log("Create Order Request Body:", req.body);
        console.log("Razorpay Key ID present:", !!process.env.RAZORPAY_KEY_ID);
        console.log("Razorpay Key Secret present:", !!process.env.RAZORPAY_KEY_SECRET);

        const { amount, currency = "INR" } = req.body;

        if (!amount) {
            return res.status(400).json({ message: "Amount is required" });
        }

        const options = {
            amount: Math.round(amount * 100), // amount in smallest currency unit (paise) & ensure integer
            currency,
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        console.log("Razorpay Order Created:", order);
        res.json(order);
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
});

// Verify Payment
router.post("/verify-payment", async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            res.json({ message: "Payment verified successfully" });
        } else {
            res.status(400).json({ message: "Invalid signature sent!" });
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
