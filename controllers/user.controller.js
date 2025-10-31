import User from "../models/user.model.js";
import { z } from "zod";

// Define a Zod schema for validating incoming user data
// Example Zod Schema (user.validator.js)

export const userValidator = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  age: z.number().int().min(18, "Must be over 18"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  address: z
    .object({
      street: z.string().optional(),
      city: z.string().optional(),
      country: z.string().optional(),
    })
    .optional(),
  hobbies: z.array(z.string()).optional(),
});

// ✅ Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from DB
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

// ✅ Get a single user by ID
export const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId); // Find user by MongoDB ID

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

// ✅ Create a new user (with validation)
export const createUser = async (req, res) => {
  try {
    // Validate user input using Zod
    const parsedData = userValidator.parse(req.body);

    // Create new user in MongoDB
    const newUser = await User.create(parsedData);
    res.status(201).json(newUser);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Return validation errors if input is invalid
      return res.status(400).json({ errors: error.errors });
    }
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

// ✅ Update existing user (with validation)
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const parsedData = userValidator.parse(req.body); // Validate input

    // Update user and return updated version
    const updatedUser = await User.findByIdAndUpdate(userId, parsedData, {
      new: true,
    });

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json(updatedUser);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

// ✅ Delete a user by ID
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};
