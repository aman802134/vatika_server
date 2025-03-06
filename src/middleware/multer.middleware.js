import multer from "multer";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadDir = path.join(__dirname, "../../uploads");
console.log("this is uploaddir : ", uploadDir);
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
    // upload only png and jpg format
    return cb(new Error("Please upload an jpg or png image"));
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default upload;
