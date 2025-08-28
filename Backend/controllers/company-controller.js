import { Company } from "../models/company-model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";
import path from "path";
export const registerCompany = async (req, res) => {
  try {
    const { companyName, description, website, location } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Logo file is required", success: false });
    }

    if (!companyName || !description || !website || !location) {
      return res.status(400).json({
        message: "All fields must be filled",
        success: false,
      });
    }

    const logo = `/uploads/${req.file.filename}`; // This will be served from public/uploads/

    let company = await Company.findOne({ companyName });

    if (company) {
      return res.status(400).json({
        message: "Company already registered with a similar name",
        success: false,
      });
    }

    company = await Company.create({
      name: companyName,
      description,
      website,
      location,
      logo,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company successfully registered",
      success: true,
      company,
    });
  } catch (e) {
    console.error("Something wrong on register company block", e);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

//get company of the authorized user
export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "Companies not found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      companies,
    });
  } catch (e) {
    console.log("Some error occured in get company block  ", e);
  }
};

//get company by id
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (e) {
    console.log("Some error occured in getcompanybyid block  ", e);
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    const updateData = { name, description, website, location };

    // Handle file upload locally
    if (req.file) {
      // Save the relative path to the uploaded file
      updateData.logo = `/uploads/${req.file.filename}`;
    }

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }

    res.status(200).json({
      message: "Company updated successfully",
      success: true,
      company,
    });
  } catch (e) {
    console.error("Error in updateCompany:", e);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
