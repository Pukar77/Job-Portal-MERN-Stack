import { Application } from "../models/application-model.js";
import { Job } from "../models/job-model.js";
import nodemailer from "nodemailer";

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
      return res.status(400).json({
        message: "Status must be entered",
        success: false,
      });
    }

    // Find application and populate applicant info
    const application = await Application.findById(applicationId).populate(
      "applicant"
    );
    if (!application) {
      return res.status(404).json({
        message: "No application found",
        success: false,
      });
    }

    // Update status
    application.status = status.toLowerCase();
    await application.save();

    // === SEND EMAIL ===
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"Your Company" <${process.env.SMTP_USER}>`,
      to: application.applicant.email,
      subject: `Application ${status}`,
      text: `Hi ${
        application.applicant.fullname
      },\n\nYour application has been ${status.toLowerCase()}.\n\nBest regards,\nCompany Team`,
      // optional HTML template
      html: `<p>Hi ${application.applicant.fullname},</p>
             <p>Your application has been <b>${status}</b>.</p>
             <p>Best regards,<br/>Company Team</p>`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      message: `Successfully updated status and email sent (${status})`,
      success: true,
    });
  } catch (e) {
    console.log("Some error occurred in updateStatus block ", e);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};
