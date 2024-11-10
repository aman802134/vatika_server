import cloudinaryConfig from "../config/cloudinaryConfig.js";
import fs from "fs";

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return "Not getting file path";
    const response = await cloudinaryConfig.uploader.upload(filePath, {
      resource_type: auto,
      use_filename: true,
    });
    console.log("file uploaded successfully", response.url);
    return response.url;
  } catch (error) {
    fs.unlinkSync(filePath);
    return null;
  }
};

export { uploadOnCloudinary };
