import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    unique: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

export const userModel = model("Users", userSchema);
