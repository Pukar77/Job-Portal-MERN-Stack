import express from "express";

import isAuthenticated from "../middlewares/Authentication-check.js";
import {
  applyjob,
  getApplicants,
  getAppliedJob,
  updateStatus,
} from "../controllers/application-controller.js";

const router = express.Router();

router.get("/apply/:id", isAuthenticated, applyjob);
router.get("/getjob", isAuthenticated, getAppliedJob);
router.get("/:id/applicants", isAuthenticated, getApplicants);
router.post("/status/:id/update", isAuthenticated, updateStatus);

export default router;
