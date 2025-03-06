import cloudinary from "../config/cloudinary.config.js";
import fs from "fs";

const uploadImage = async (filePath) => {
  try {
    if (!filePath) {
      return { msg: "Please provide a file path" };
    }
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    console.log("response", response.url);
    fs.unlinkSync(filePath);
    return response;
  } catch (error) {
    fs.unlinkSync(filePath);
    return { msg: error.message };
  }
};

export default uploadImage;
