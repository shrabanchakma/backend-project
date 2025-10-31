// 👉 Import Order model, Cart model (optional), and zod for validation
// import Order from "../models/order.model.js";
// import Cart from "../models/cart.model.js";
// import { z } from "zod";

// 👉 Define zod schema for validating order data
// const orderValidator = z.object({
//   userId: z.string(),
//   items: z.array(z.object({
//     productId: z.string(),
//     quantity: z.number().int().positive(),
//     price: z.number().positive(),
//   })),
//   totalAmount: z.number().positive(),
//   paymentMethod: z.string(),
// });

// 👉 Define controller functions:
// - getOrders: Fetch all orders or orders by user
// - getOrder: Fetch a specific order by ID
// - createOrder: Validate data, calculate total, and save new order
// - updateOrder: Update order status or payment info
// - deleteOrder: Cancel or remove an order
// - getUserOrders: Custom route to fetch all orders for a specific user

// 👉 Use try/catch blocks for async operations
// 👉 Validate request body before saving
// 👉 Return proper status codes and descriptive JSON responses
