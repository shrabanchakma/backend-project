import { z } from "zod";

const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format");

const orderedItemSchema = z.object({
  productId: objectIdSchema,
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  priceAtPurchase: z.number().min(0, "Price cannot be negative"),
});

export const createOrderSchema = z.object({
  items: z
    .array(orderedItemSchema)
    .min(1, "Order must contain at least one item"),

  shippingAddress: z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().optional(),
    postalCode: z.string().min(1, "Postal code is required"),
    country: z.string().min(1, "Country is required"),
  }),

  paymentMethod: z.enum(
    ["credit_card", "paypal", "cod", "stripe", "bank_transfer"],
    {
      errorMap: () => ({ message: "Please select a valid payment method" }),
    },
  ),
  paymentStatus: z
    .enum(["pending", "paid", "failed", "refunded"])
    .default("pending"),
  orderStatus: z
    .enum(["processing", "shipped", "delivered", "cancelled"])
    .default("processing"),
});

// If you want to update order status
export const updateOrderStatusSchema = z.object({
  orderStatus: z.enum(["processing", "shipped", "delivered", "cancelled"]),
  paymentStatus: z.enum(["pending", "paid", "failed", "refunded"]).optional(),
});
