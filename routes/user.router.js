import express from "express";
import { 
  getUsers, 
  getUser, 
  createUser, 
  updateUser, 
  deleteUser 
} from "../controllers/user.controller.js";

const router = express.Router();

// ✅ Get all users
router.get("/users", getUsers);

// ✅ Get a specific user by ID
router.get("/users/:id", getUser);

// ✅ Create a new user
router.post("/users", createUser);

// ✅ Update an existing user
router.put("/users/:id", updateUser);

// ✅ Delete a user
router.delete("/users/:id", deleteUser);


export default router;
