import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must not exceed 30 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores",
    ),

  email: z.email("Invalid email format").toLowerCase(),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must not exceed 100 characters"),

  role: z.enum(["user", "admin"]).optional(),
});

export const loginSchema = z.object({
  identifier: z.string().min(1, "Email or username is required"),

  password: z.string().min(1, "Password is required"),
});
