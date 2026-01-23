import { z } from "zod";

const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format");

const cartItemSchema = z.object({
  productId: objectIdSchema,
  quantity: z.number().int().min(1, "Quantity must be at least 1").default(1),
});

export const addToCartSchema = z.object({
  productId: objectIdSchema,
  quantity: z.number().int().min(1).optional().default(1),
});

export const cartUpdateSchema = z.object({
  items: z.array(cartItemSchema).min(1, "Cart must have at least one item"),
  status: z.enum(["active", "ordered", "cancelled"]).optional(),
});
