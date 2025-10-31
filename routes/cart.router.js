import express from "express";
import {
  getCarts,
  getCart,
  getUserCart,
  createCart,
  updateCart,
  deleteCart,
  clearCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

// Base CRUD Routes
router.get("/carts", getCarts); // Get all carts (e.g., for Admin)
router.get("/carts/:id", getCart); // Get single cart by Cart ID
router.post("/carts", createCart); // Create new cart
router.put("/carts/:id", updateCart); // Update cart items
router.delete("/carts/:id", deleteCart); // Delete a cart

// Custom Routes (Recommended for user-facing actions)
router.get("/carts/user/:userId", getUserCart); // Get cart by User ID (useful for frontends)
router.delete("/carts/:id/clear", clearCart); // Clear all items in a specific cart

export default router;
