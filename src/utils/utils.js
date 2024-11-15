import fs from "fs";
import cloudinary from "../config/cloudinaryConfig.js";

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return "Not getting file path";
    const response = await cloudinary.uploader.upload(filePath);
    console.log("file uploaded successfully", response.url);
    fs.unlinkSync(filePath);
    return response.url;
  } catch (error) {
    fs.unlinkSync(filePath);
    return null;
  }
};

export { uploadOnCloudinary };
