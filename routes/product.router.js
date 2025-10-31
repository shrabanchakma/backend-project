import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

// ✅ Get all products
router.get("/products", getProducts);

// ✅ Get a specific product by ID
router.get("/products/:id", getProduct);

// ✅ Create a new product
router.post("/products", createProduct);

// ✅ Update an existing product
router.put("/products/:id", updateProduct);

// ✅ Delete a product
router.delete("/products/:id", deleteProduct);

export default router;
