
import { Application } from "../models/application-model.js";

export const applyjob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({
        message: "Job id is required",
        success: false,
      });
    }

    //user le pailai yo job ma apply gareko xa ki xaina bhanera check garne
    const exsitingApplication = await Application.findOne(jobId);


  } catch (e) {
    console.log("Some error occured in applyjob block ", e);
  }
};
