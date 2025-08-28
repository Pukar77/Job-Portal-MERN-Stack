import express from "express";

import isAuthenticated from "../middlewares/Authentication-check.js";
import {
  getAdminJob,
  getAllJobs,
  getJobById,
  postJob,
  deleteJob,
} from "../controllers/job-controller.js";

const router = express.Router();

// Create a new job
router.post("/post", isAuthenticated, postJob);

// Get all jobs
router.get("/getjob", getAllJobs);

// Get a single job by ID
router.get("/getjob/:id", getJobById);

// Get jobs created by admin (recruiter)
router.get("/getadminjob", isAuthenticated, getAdminJob);

// Delete a job by ID
router.delete("/delete/:id", isAuthenticated, deleteJob);

export default router;
