import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

const PORT = 3000;
const app = express();
// dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({ dest: "uploads/" });
// //disk storage from multer format perseveration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix);
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.end("hii from server");
});

// app.post("/upload", (req, res) => {
//   console.log(req.body);
//   res.end("file uploaded");
// });

app.post("/login", upload.single("dp"), (req, res) => {
  res.end("file uploaded");
  //   console.log(req.body);
});

export default upload;