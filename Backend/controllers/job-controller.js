import { Job } from "../models/job-model.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "All field must be filled",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      Salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });
    return res.status(201).json({
      message: "New job created successfully",
      success: true,
      job,
    });
  } catch (e) {
    console.log("Some error occured in postjob block   ", e);
  }
};

export const getAllJobs = async (req, res) => {
  try {
    //for filtering

    //url paxi keyword aauxa. for eg: http:pukar/api/hero?keyword="don"
    const keyword = req.query.keyword || "";

    //regex le tyo keyword lai search garxa, and options="i" bhaneko chai ignore ho, for eg: Developer = developer = deVEloPer, esto type ko.
    const query = {
      $or: [{ title: { $regex: keyword, $options: "i" } }],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: "No jobs found",
        success: false, 
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (e) {
    console.log("Some error occured in getalljobs block  ", e);
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path:"applications"
    });

    if (!job) {
      return res.status(404).json({
        message: "No jobs available",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (e) {
    console.log("Some error occured in getjobbyid block  ", e);
  }
};

//per recruiter jobs(Jobs created by a particular recruiter)
export const getAdminJob = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId });

    if (!jobs) {
      return res.status(404).json({
        message: "You havenot posted any jobs",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (e) {
    console.log("Some error occured in getAdminJob block  ", e);
  }
};
