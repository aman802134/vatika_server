import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product.controller.js";
import upload from "../middleware/multer.middleware.js";
import authMiddleware from "../middleware/authentication.middleware.js";
import isAdmin from "../middleware/authorization.middleware.js";

const router = express.Router();

router.post(
  "/create-product",
  authMiddleware,
  isAdmin,
  upload.single("image"),
  createProduct
);
router.get("/allProducts", getAllProducts);
router.get("/oneProduct/:id", getProductById);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

export const productRoute = router;
