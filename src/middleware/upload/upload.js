import multer from "multer";
import { v4 as uuidv4 } from "uuid";

// Configure storage options with a unique filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    // Set unique filename using UUID
    const uniqueSuffix = uuidv4();
    const originalName = file.originalname;
    const extension = originalName.substring(originalName.lastIndexOf("."));
    cb(null, `${uniqueSuffix}${extension}`);
  },
});

// Set up multer with storage, file type filter, and size limit
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error("Only image files (JPEG, PNG, JPG) are allowed"), false); // Reject the file
    }
  },
});

export { upload };
