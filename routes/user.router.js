import express from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  getProfile,
  getAllUsers,
} from "../controllers/user.controller.js";
import {
  authenticate,
  authorizeAdmin,
  validate,
} from "../middleware/auth.middleware.js";
import {
  registerSchema,
  updateUserSchema,
} from "../Validators/auth.validator.js";

const router = express.Router();

router.post(
  "/addUser",
  authenticate,
  authorizeAdmin,
  validate(registerSchema),
  createUser,
);
router.get("/getAllUsers", authenticate, authorizeAdmin, getAllUsers);
router.get("/profile", authenticate, getProfile);
router.patch(
  "/updateProfile",
  authenticate,
  validate(updateUserSchema),
  updateUser,
);
router.delete("/deleteUser/:id", authenticate, authorizeAdmin, deleteUser);

export default router;
