import { Product } from "../models/product.model.js";
import uploadImage from "../utils/upload.cloudinary.js";

export const createProduct = async (req, res) => {
  try {
    const { name, type, description, category, price, quantity } = req.body;

    const filePath = req.file.path;
    const result = await uploadImage(filePath);
    if (result.msg) {
      return res.status(500).json({ msg: result.msg });
    }
    const image = result.url;
    console.log(req.body);
    console.log("image-path", image);

    if (
      !name ||
      !image ||
      !type ||
      !description ||
      !category ||
      !price ||
      !quantity
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const newProduct = new Product({
      name,
      image,
      type,
      description,
      category,
      price,
      quantity,
    });
    const isCreatedProduct = await newProduct.save();
    if (isCreatedProduct) {
      return res.status(201).json({ msg: "Product created successfully" });
    } else {
      return res.status(400).json({ msg: "Product creation failed" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
