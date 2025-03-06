import mongoose, { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["aquatic", "desert", "ornamental", "useCase", "climate"],
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["indoor", "outdoor"],
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Product = model("Product", productSchema);
