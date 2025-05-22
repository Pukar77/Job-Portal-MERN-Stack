import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user-controller.js";
import isAuthenticated from "../middlewares/Authentication-check.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", singleUpload, register);
router.post("/login", login);
router.post("/profile/update", isAuthenticated, updateProfile);
router.get("/logout", logout);

export default router;
