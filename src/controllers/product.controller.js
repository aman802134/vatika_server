import { productModel } from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/utils.js";
// import { v4 as uuidv4 } from "uuid";
// import { unlink } from "fs/promises";

export const createProduct = async (req, res) => {
  try {
    const { name, category, quantity, description, price } = req.body;

    if (!name || !price || !description || !category || !quantity) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    console.log(req.body);
    console.log(req.fileName);
    const image = req.files?.image;
    // console.log(image);
    if (!image) {
      return res.status(400).json({ msg: "Image is required" });
    }

    // const imageId = uuidv4();
    // const imageExtension = image.name.split(".").pop();
    // const fileName = `${imageId}.${imageExtension}`;

    const result = await uploadOnCloudinary(image, "../public/images");

    if (!result) {
      return res.status(400).json({ msg: "Failed to upload image" });
    }

    const product = new productModel({
      name,
      price,
      description,
      category,
      quantity,
      image: "../public/images",
    });

    const saveProduct = await product.save();

    return res.status(201).json({ msg: "Product created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// get product code *******
export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find().populate("category");

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id).populate("category");

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, category, type, quantity } = req.body;

    if (!name || !price || !description || !category || !type || !quantity) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const image = req.files?.image;
    let fileName;
    if (image) {
      const imageId = uuidv4();
      const imageExtension = image.name.split(".").pop();
      fileName = `${imageId}.${imageExtension}`;

      const result = await uploadImage(image, fileName);

      if (!result) {
        return res.status(400).json({ msg: "Failed to upload image" });
      }
    }

    const product = await productModel.findByIdAndUpdate(
      id,
      {
        name,
        price,
        description,
        category,
        type,
        quantity,
        image: fileName || undefined,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    if (fileName) {
      const oldImage = await productModel.findById(id, { image: 1 });
      if (oldImage.image) {
        await unlink(`public/images/${oldImage.image}`);
      }
    }

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findByIdAndRemove(id);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    if (product.image) {
      await unlink(`public/images/${product.image}`);
    }

    return res.status(200).json({ msg: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};
