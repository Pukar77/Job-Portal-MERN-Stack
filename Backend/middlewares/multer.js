// middlewares/multer.js
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder where files will be stored
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, uuidv4() + ext); // Unique filename
  },
});

export const singleUpload = multer({ storage }).single("file");
