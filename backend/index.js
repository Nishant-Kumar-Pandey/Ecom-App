import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Authcontroller from "./controllers/Authcontroller.js";
import ProductController from "./controllers/ProductController.js";
import cors from "cors";
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Global Request Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import PaymentController from "./controllers/PaymentController.js";

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());

app.use("/api/auth", Authcontroller);
app.use("/api/products", ProductController);
app.use("/api/payment", PaymentController);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});