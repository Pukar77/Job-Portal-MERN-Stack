import { Company } from "../models/company-model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName, description, website, location } = req.body;
    const file = req.file;
    //cludinary
    const fileUri = getDataUri(file);
    const cloudeResponse = await cloudinary.uploader.upload(fileUri.content);
    const logo = cloudeResponse.secure_url;

    if (!companyName || !description || !website || !location) {
      return res.status(400).json({
        message: "All field must be filled",
        success: false,
      });
    }

    let company = await Company.findOne({ companyName });

    if (company) {
      return res.status(400).json({
        message: "Company already registered with similar name",
        success: false,
      });
    }

    company = await Company.create({
      name: companyName,
      description: description,
      website: website,
      location: location,
      logo: logo,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company successfully registered",
      success: true,
      company,
    });
  } catch (e) {
    console.log("Something wrong on register company block  ", e);
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
    const file = req.file;
    //clodinary
    const fileUri = getDataUri(file);
    const cloudeResponse = await cloudinary.uploader.upload(fileUri.content);
    const logo = cloudeResponse.secure_url;

    const updateData = { name, description, website, location, logo };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company information updated",
      success: true,
    });
  } catch (e) {
    console.log("Some error occured in updatecompany block  ", e);
  }
};
