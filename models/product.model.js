import mongoose from "mongoose";

// Define the schema for the Product model
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true }, // Name of the product
    price: { type: Number, required: true, min: 0 }, // Price of the product
    description: { type: String, trim: true }, // Detailed product description
    category: { type: String, trim: true }, // Product category (e.g., Electronics, Clothing)
    stock: { type: Number, required: true, min: 0 }, // Quantity in stock
    isAvailable: { type: Boolean, default: true }, // Whether the product is actively listed
    imageUrl: { type: String, required: true }, // URL for the main product image
    // You could also add a reference to a User/Admin who created the product here
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Export Product model
export default mongoose.model("Product", productSchema);
