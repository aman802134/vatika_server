import { config as conf } from "dotenv";
conf();
export const _config = {
  mongoURL: process.env.MONGODB_URL,
  port: process.env.PORT,
  jwt_secret: process.env.JWT_SECRET,
};
export const config = Object.freeze(_config);
