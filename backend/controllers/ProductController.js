import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ProductController = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

ProductController.get("/", async (req, res) => {
    console.log("ProductController: Received request for products");
    try {
        const filePath = path.join(__dirname, "../products/products.json");
        console.log("ProductController: Resolving file path:", filePath);

        if (!fs.existsSync(filePath)) {
            console.error("Product file not found at:", filePath);
            return res.status(404).json({ message: "Product data file not found" });
        }
        const data = await fs.promises.readFile(filePath, "utf-8");
        const products = JSON.parse(data);
        console.log(`ProductController: Successfully loaded ${products.length} products`);
        res.status(200).json({ products });
    } catch (error) {
        console.error("Error in ProductController:", error);
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
});

export default ProductController;
