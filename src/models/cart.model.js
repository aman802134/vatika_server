import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  products: {
    type: Array,
    default: [],
    required: true,
    ref: "Product",
  },
  total: {
    type: Number,
    default: 0,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

export const cartModel = model("Cart", cartSchema);
