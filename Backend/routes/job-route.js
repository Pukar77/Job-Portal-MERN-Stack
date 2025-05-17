import express from "express";

import isAuthenticated from "../middlewares/Authentication-check.js";
import {
  getAdminJob,
  getAllJobs,
  getJobById,
  postJob,
} from "../controllers/job-controller.js";

const router = express.Router();

router.post("/post", isAuthenticated, postJob);
router.get("/getjob", getAllJobs);
router.get("/getadminjob", isAuthenticated, getAdminJob);
router.get("/getjob/:id", getJobById);

export default router;
