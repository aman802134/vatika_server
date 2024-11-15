import express from "express";
import { upload } from "../middleware/upload/upload.js";
import { createProduct } from "../controllers/product.controller.js";

const uploadRouter = express.Router();

uploadRouter.post("/create-product", upload.single("image"), createProduct);

export { uploadRouter };
