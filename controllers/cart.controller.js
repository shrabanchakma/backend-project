import Cart from "../models/cart.model.js";
import { z } from "zod";

// --- ZOD VALIDATION ---
const itemValidator = z.object({
  productId: z.string().length(24, "Invalid Product ID format"), // Assuming MongoDB ObjectId string
  quantity: z
    .number()
    .int()
    .positive("Quantity must be a positive integer")
    .default(1),
});

export const cartValidator = z.object({
  userId: z.string().length(24, "Invalid User ID format"),
  items: z.array(itemValidator).optional(),
});

// --- HELPER FUNCTION (Simplified) ---
// In a real app, this would fetch product prices and calculate the total.
const calculateTotalPrice = (items) => {
  // Placeholder logic:
  // In production: return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return 0;
};

// ✅ Get all carts (Admin/Dev use)
export const getCarts = async (req, res) => {
  try {
    // Use .populate() to show who owns the cart and what products are inside
    const carts = await Cart.find().populate("userId", "name email").exec();
    res.status(200).json(carts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching carts", error: error.message });
  }
};

// ✅ Get a single cart by ID
export const getCart = async (req, res) => {
  try {
    const cartId = req.params.id;
    const cart = await Cart.findById(cartId).populate(
      "items.productId",
      "name price"
    );

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.status(200).json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching cart", error: error.message });
  }
};

// ✅ Get a cart by User ID (Recommended for user frontends)
export const getUserCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    // Find the active cart for the specific user
    const cart = await Cart.findOne({
      userId: userId,
      status: "active",
    }).populate("items.productId", "name price");

    if (!cart)
      return res
        .status(404)
        .json({ message: "Active cart not found for this user" });

    res.status(200).json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user's cart", error: error.message });
  }
};

// ✅ Create a new cart (Typically only run once per user)
export const createCart = async (req, res) => {
  try {
    const parsedData = cartValidator.parse(req.body);

    // Ensure only one cart per user is created
    const existingCart = await Cart.findOne({
      userId: parsedData.userId,
      status: "active",
    });
    if (existingCart) {
      return res
        .status(409)
        .json({ message: "User already has an active cart." });
    }

    // Initialize the total price (will be updated by subsequent PUT requests)
    parsedData.totalPrice = calculateTotalPrice(parsedData.items || []);

    const newCart = await Cart.create(parsedData);
    res.status(201).json(newCart);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res
      .status(500)
      .json({ message: "Error creating cart", error: error.message });
  }
};

// ✅ Update cart (Add/Modify items)
export const updateCart = async (req, res) => {
  try {
    const cartId = req.params.id;
    // We only validate the items array for update, not the whole cart object
    const updateValidator = z.object({
      items: z
        .array(itemValidator)
        .min(1, "Items array cannot be empty")
        .optional(),
    });
    const parsedData = updateValidator.parse(req.body);

    // Find the cart and update the items array
    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      { $set: { items: parsedData.items } },
      { new: true } // Return the updated document
    );

    if (!updatedCart)
      return res.status(404).json({ message: "Cart not found" });

    // Note: In a real app, totalPrice would be recalculated here and saved.
    res.status(200).json(updatedCart);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res
      .status(500)
      .json({ message: "Error updating cart", error: error.message });
  }
};

// ✅ Clear all items in a specific cart
export const clearCart = async (req, res) => {
  try {
    const cartId = req.params.id;
    const clearedCart = await Cart.findByIdAndUpdate(
      cartId,
      { $set: { items: [], totalPrice: 0 } }, // Clear items and set price to zero
      { new: true }
    );

    if (!clearedCart)
      return res.status(404).json({ message: "Cart not found" });

    res.status(200).json(clearedCart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error clearing cart", error: error.message });
  }
};

// ✅ Delete cart
export const deleteCart = async (req, res) => {
  try {
    const cartId = req.params.id;
    const deletedCart = await Cart.findByIdAndDelete(cartId);

    if (!deletedCart)
      return res.status(404).json({ message: "Cart not found" });

    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting cart", error: error.message });
  }
};
