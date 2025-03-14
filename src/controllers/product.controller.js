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

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return res.status(400).json({ msg: "No products found" });
    }
    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ msg: "unable to fetch the product due to PID" });
    }
    const product = await Product.findById(id);
    if (product) {
      return res.status(200).json({ msg: "product found", product });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, description, category, price, quantity } = req.body;
    if (!id) {
      return res
        .status(400)
        .json({ msg: "unable to update the product due to PID" });
    }
    const product = await Product.findById(id);
    if (!product) {
      return res.status(400).json({ msg: "No product found" });
    }
    const filePath = req.file.path;
    const result = await uploadImage(filePath);
    if (result.msg) {
      return res.status(500).json({ msg: result.msg });
    }
    const image = result.url;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        image,
        type,
        description,
        category,
        price,
        quantity,
      },
      { new: true }
    );
    if (updatedProduct) {
      return res.status(200).json({ msg: "Product updated successfully" });
    } else {
      return res.status(400).json({ msg: "Product updation failed" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ msg: "unable to delete the product due to PID" });
    }
    const product = await Product.findById(id);
    if (!product) {
      return res.status(400).json({ msg: "No product found" });
    }
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (deletedProduct) {
      return res.status(200).json({ msg: "Product deleted successfully" });
    } else {
      return res.status(400).json({ msg: "Product deletion failed" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
