import express from "express";
import {
  getAllProducts,
  getProductById,
} from "../controllers/product.controller.js";

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);

export { productRouter };
