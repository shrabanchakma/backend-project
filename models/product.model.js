import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, trim: true },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: ["Fiction", "Non-Fiction", "Sci-Fi", "Self-Help", "Mystery"],
    },
    stock: { type: Number, required: true, min: 0 },
    isAvailable: { type: Boolean, default: true },
    imageUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Product", productSchema);
