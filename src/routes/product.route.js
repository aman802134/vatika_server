import express from "express";
import { createProduct } from "../controllers/product.controller.js";
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
router.get("/produts");
router.get("/product/:id");

export const productRoute = router;
