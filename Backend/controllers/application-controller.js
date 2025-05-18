import { Application } from "../models/application-model.js";
import { Job } from "../models/job-model.js";

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
    const exsitingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (exsitingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }

    //check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    //naya application banaune
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      message: "Job applied successfully",
      success: true,
    });
  } catch (e) {
    console.log("Some error occured in applyjob block ", e);
  }
};

//particular person le apply gareko job haru
export const getAppliedJob = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!application) {
      return res.status(404).json({
        message: "You haven't applied for any jobs yet",
        success: false,
      });
    }

    return res.status(200).json({
      application,
      success: true,
    });
  } catch (e) {
    console.log("Some error occured in the getappliedjob block  ", e);
  }
};

//kati user le apply gareko xa particular job ma bhanera admin le check garne
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (e) {
    console.log("Some error occured in getapplicants block ", e);
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(404).json({
        message: "Status must be entered",
        success: false,
      });
    }

    //applicantId lai herera application find garne
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "No application found",
        success: false,
      });
    }

    //update status
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Succesfully updated status",
      success: true,
    });
  } catch (e) {
    console.log("Some error occured in updateStatus block ", e);
  }
};
