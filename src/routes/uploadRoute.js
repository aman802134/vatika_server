import express from "express";
// import { upload } from "../middleware/upload/upload.js";

const uploadRouter = express.Router();

uploadRouter.post("/upload");

export { uploadRouter };
