import bcrypt from "bcryptjs";
import { User } from "../models/user-model.js";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All the fields must be filled",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const file = req.file;
    let profilePhotoUrl = "";

    if (file) {
      profilePhotoUrl = file.path; // local path of the uploaded file
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashPassword,
      role,
      profile: {
        profilePhoto: profilePhotoUrl,
      },
    });

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (e) {
    console.error("Some error occurred in register block", e);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All the field must be filled",
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Password",
      });
    }

    //check the role(user le admin ko login gareko case, OR admin le user ko login gareko case check garne)

    if (role !== user.role) {
      return res.status(400).json({
        success: false,
        message: "Account doesnot exist with current role",
      });
    }

    //generating token to store user information
    const tokenData = {
      userId: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    //token lai cookie ma store garne
    //cookie ko name is first wala token and the content that is set in the cookie is token(second wala) , maxage means that cookie expires in 1 day
    //Makes the cookie inaccessible to JavaScript (e.g., document.cookie).// Helps prevent XSS attacks.
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        success: true,
        user,
        message: `Welcome back ${user.fullname}`,
      });
  } catch (e) {
    console.log("Some error occured in login block", e);
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Loged out successfully",
      success: true,
    });
  } catch (e) {
    console.log("Some error occured in logout block", e);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    // Prepare skills array
    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",").map((skill) => skill.trim());
    }

    const userId = req.id; // from middleware

    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    // Update basic info
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    // Save local file path if file is uploaded
    if (file) {
      user.profile.resume = file.path; // Local path of file
      user.profile.resumeOriginalName = file.originalname;
    }

    await user.save();

    const filteredUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user: filteredUser,
    });
  } catch (e) {
    console.error("Error in updateProfile:", e);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
