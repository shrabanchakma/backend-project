import mongoose from "mongoose";

// Define the schema for each ordered item
const orderedItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // Reference to the Product model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  priceAtPurchase: {
    type: Number,
    required: true, // Store the product price at the time of purchase
    min: 0,
  },
});

// Define the main Order schema
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User who placed the order
      required: true,
    },
    items: [orderedItemSchema], // List of products purchased
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      enum: ["credit_card", "paypal", "cod", "stripe", "bank_transfer"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["processing", "shipped", "delivered", "cancelled"],
      default: "processing",
    },
    orderedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

orderSchema.pre("save", function (next) {
  this.totalAmount = this.items.reduce((sum, item) => {
    return sum + item.quantity * item.priceAtPurchase;
  }, 0);
  next();
});

// Export the Order model
export default mongoose.model("Order", orderSchema);
