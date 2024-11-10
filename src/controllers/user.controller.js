import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if all fields are provided
  if (!name || !email || !password) {
    return res.status(401).send({ msg: "All fields are required" });
  }

  try {
    // Check if the user already exists in the database
    const CheckExistingUser = await userModel.findOne({ email });
    if (CheckExistingUser) {
      return res.status(401).send({ msg: "User already exists" });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new userModel({
      name,
      email,
      password: hashPassword,
    });

    // Save the user to the database
    const saveUser = await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: saveUser._id }, config.jwt_secret, {
      expiresIn: "2d", // Token is valid for 2 days
    });

    // Return the JWT token
    return res.status(201).json({ accessToken: token });
  } catch (error) {
    // Return an internal server error
    return res.status(500).json({ msg: "internal server error" });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Check if all fields are provided
  if (!email || !password) {
    return res.status(401).send({ msg: "All fields are required" });
  }

  try {
    // Check if the user already exists in the database
    const CheckExistingUser = await userModel.findOne({ email });

    // If the user does not exist, return an error
    if (!CheckExistingUser) {
      return res.status(401).send({ msg: "User does not exist" });
    }

    // Compare the provided password with the hashed password in the database
    const isCorrectPassword = await bcrypt.compare(
      password,
      CheckExistingUser.password
    );

    // If the password is incorrect, return an error
    if (!isCorrectPassword) {
      return res.status(401).send({ msg: "Incorrect password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: CheckExistingUser._id },
      config.jwt_secret,
      {
        expiresIn: "2d", // Token is valid for 2 days
      }
    );

    // Return the JWT token
    return res.status(201).json({ accessToken: token });
  } catch (error) {
    // Return an internal server error
    return res.status(500).json({ msg: "internal server error" });
  }
};
