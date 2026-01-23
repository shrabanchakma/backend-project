import express from "express";
import {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  getMyOrders,
} from "../controllers/order.controller.js";
import {
  authenticate,
  authorizeAdmin,
  validate,
} from "../middleware/auth.middleware.js";
import { createOrderSchema } from "../Validators/order.validator.js";

const router = express.Router();

router.get("/myOrders", authenticate, getMyOrders);
router.get("/allOrders", authenticate, authorizeAdmin, getAllOrders);
router.post("/", authenticate, validate(createOrderSchema), createOrder);
router.put("/status/:id", authenticate, authorizeAdmin, updateOrder);
router.delete("/orders/:id", authenticate, authorizeAdmin, deleteOrder);

export default router;
