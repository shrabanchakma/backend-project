import mongoose from "mongoose";

// Define the schema for the cart items (sub-document)
const itemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // Reference to the Product model
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
  // We won't store the price here, but calculate it in the controller/virtual
});

// Define the main Cart schema
const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
      unique: true, // A user should only have one active cart
    },
    items: [itemSchema], // Array of products and quantities
    totalPrice: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: ["active", "ordered", "cancelled"], // Tracks cart lifecycle
      default: "active",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Export the Cart model
export default mongoose.model("Cart", cartSchema);
