import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
// register controller
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });
    const isCreatedNewUser = await newUser.save();
    if (isCreatedNewUser) {
      const accessToken = jwt.sign(
        {
          id: newUser._id,
          email: newUser.email,
          role: newUser.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      res.cookie("access_token", accessToken, {
        httpOnly: true,
        sameSite: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.status(201).json({ msg: "User registered successfully" });
    } else {
      return res.status(400).json({ msg: "User registration failed" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// login controller

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "please fill required field" });
    }
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res
        .status(400)
        .json({ msg: "user doesnot exist ! please register first" });
    }
    const isPasswordMatch = await bcrypt.compare(password, findUser.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ msg: "invalid credentials" });
    }
    const accessToken = jwt.sign(
      {
        id: findUser._id,
        email: findUser.email,
        role: findUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      sameSite: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({ message: "login successfull", accessToken });
  } catch (error) {
    res.status(500).json({ msg: "something error happend" });
  }
};
