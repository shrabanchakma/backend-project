import express from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import { authenticate, validate } from "../middleware/auth.middleware.js";
import { loginSchema, registerSchema } from "../Validators/auth.validator.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", authenticate, logout);

export default router;
