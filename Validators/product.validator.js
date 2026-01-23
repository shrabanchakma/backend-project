import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required").trim(),

  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .min(0, "Price cannot be negative"),

  description: z.string().trim().optional(),

  category: z.enum([
    "Fiction",
    "Non-Fiction",
    "Sci-Fi",
    "Self-Help",
    "Mystery",
  ]),

  stock: z
    .number({ invalid_type_error: "Stock must be a number" })
    .int("Stock must be a whole number") // Stock shouldn't be a decimal
    .min(0, "Stock cannot be negative"),

  isAvailable: z.boolean().default(true),

  imageUrl: z.url("Please provide a valid image URL"),
});

// For updating products (all fields optional)
export const updateProductSchema = productSchema.partial();
