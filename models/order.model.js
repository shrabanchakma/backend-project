import mongoose from "mongoose";

// 👉 Define order schema structure
// Orders usually link to a user and may include multiple products or a cart reference.

// Example fields you might include:
// - userId: reference to User model (required)
// - items: array of objects containing
//      - productId: reference to Product model
//      - quantity: number
//      - price: number (store actual price at purchase time)
// - totalAmount: number (sum of all item prices)
// - shippingAddress: object or string
// - paymentMethod: string (e.g., "card", "cash on delivery")
// - paymentStatus: string (e.g., "pending", "paid", "failed")
// - orderStatus: string (e.g., "processing", "shipped", "delivered", "cancelled")
// - orderDate: date (default: current date)
// - timestamps: for createdAt and updatedAt

// 👉 Add pre-save middleware to calculate totalAmount if needed

// 👉 Example setup:
// const orderSchema = new mongoose.Schema({ ... }, { timestamps: true });

// 👉 Export Order model
// export default mongoose.model("Order", orderSchema);
