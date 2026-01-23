import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import {
  authenticate,
  authorizeAdmin,
  validate,
} from "../middleware/auth.middleware.js";
import {
  productSchema,
  updateProductSchema,
} from "../Validators/product.validator.js";

const router = express.Router();

router.post(
  "/addProduct",
  authenticate,
  authorizeAdmin,
  validate(productSchema),
  createProduct,
);
router.get("/allProducts", authenticate, getProducts);
router.get("/:id", authenticate, getProduct);
router.patch(
  "/update/:id",
  authenticate,
  authorizeAdmin,
  validate(updateProductSchema),
  updateProduct,
);
router.delete("/delete/:id", authenticate, authorizeAdmin, deleteProduct);

export default router;
