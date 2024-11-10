import { config as conf } from "dotenv";
conf();
export const _config = {
  mongoURL: process.env.MONGODB_URL,
  port: process.env.PORT,
  jwt_secret: process.env.JWT_SECRET,
  cloudinary_name: process.env.CLOUDINARY_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
};
export const config = Object.freeze(_config);
