import Order from "../models/order.model.js";
import { z } from "zod";

// zod validation
const orderValidator = z.object({
  userId: z.string(),
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().int().positive(),
      priceAtPurchase: z.number().positive(),
    })
  ),
  totalAmount: z.number().positive().optional(), // Will be auto-calculated if missing
  paymentMethod: z.enum([
    "credit_card",
    "paypal",
    "cod",
    "stripe",
    "bank_transfer",
  ]),
  shippingAddress: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string().optional(),
    postalCode: z.string(),
    country: z.string(),
  }),
});

// 👉 Get all orders
export const getOrders = async (req, res) => {
  try {
    const { userId } = req.query; // ?userId=abc
    const filter = userId ? { userId } : {};

    const orders = await Order.find(filter)
      .populate("userId")
      .populate("items.productId");
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// 👉 Get single order by ID
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId")
      .populate("items.productId");

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};

// 👉 Create new order
export const createOrder = async (req, res) => {
  try {
    // Validate incoming data
    const validatedData = orderValidator.parse(req.body);

    // Auto-calculate totalAmount if not provided
    const totalAmount =
      validatedData.totalAmount ??
      validatedData.items.reduce(
        (sum, item) => sum + item.quantity * item.priceAtPurchase,
        0
      );

    const newOrder = new Order({
      ...validatedData,
      totalAmount,
    });

    await newOrder.save();
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to create order",
        error: error.message,
      });
    }
  }
};

// 👉 Update order (status, payment, etc.)
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const order = await Order.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Order updated", data: order });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update order",
      error: error.message,
    });
  }
};

// 👉 Delete / Cancel order
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete order",
      error: error.message,
    });
  }
};

// 👉 Get all orders for a specific user (custom route)
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId })
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user orders",
      error: error.message,
    });
  }
};
