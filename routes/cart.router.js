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
import { authenticate, validate } from "../middleware/auth.middleware.js";
import { cartUpdateSchema } from "../Validators/cart.validator.js";

const router = express.Router();

router.get("/carts", authenticate, getCarts);
router.get("/carts/:id", authenticate, getCart);
router.post("/carts", authenticate, validate(addToCartSchema), createCart);
router.put("/carts/:id", authenticate, validate(cartUpdateSchema), updateCart);
router.delete("/carts/:id", authenticate, deleteCart);

router.get("/carts/user/:userId", getUserCart);
router.delete("/carts/:id/clear", clearCart);

export default router;
