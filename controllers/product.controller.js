import Product from "../models/product.model.js";
import { z } from "zod";

// Define a Zod schema for validating incoming product data
export const productValidator = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.number().min(0, "Price must be non-negative"),
  description: z.string().optional(),
  category: z.string().optional(),
  stock: z.number().int().min(0, "Stock must be a non-negative integer"),
  isAvailable: z.boolean().optional().default(true),
  imageUrl: z.string().url("Must be a valid image URL"),
});

// ✅ Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};

// ✅ Get a single product by ID
export const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
};

// ✅ Create a new product (with validation)
export const createProduct = async (req, res) => {
  try {
    // Validate product input using Zod
    const parsedData = productValidator.parse(req.body);

    // Create new product in MongoDB
    const newProduct = await Product.create(parsedData);
    res.status(201).json(newProduct);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Return validation errors if input is invalid
      return res.status(400).json({ errors: error.errors });
    }
    res
      .status(500)
      .json({ message: "Error creating product", error: error.message });
  }
};

// ✅ Update existing product (with validation)
export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    // Allow partial updates by using .partial() on the Zod schema
    const parsedData = productValidator.partial().parse(req.body);

    // Update product and return updated version
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      parsedData,
      {
        new: true,
        runValidators: true, // Run Mongoose validators on update
      }
    );

    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json(updatedProduct);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
};

// ✅ Delete a product by ID
export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
};
