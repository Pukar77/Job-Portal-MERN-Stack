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
        message: "All the field must be filled",
      });
    }

    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudeResponse = await cloudinary.uploader.upload(fileUri.content);

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exist with this email",
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashpassword,
      role,
      profile: {
        profilePhoto: cloudeResponse.secure_url,
      },
    });

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (e) {
    console.log("Some error occured in register block", e);
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
    //cloudinary
    let cloudeResponse;
    if (file) {
      const fileUri = getDataUri(file);
      cloudeResponse = await cloudinary.uploader.upload(fileUri.content);
    }

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.id; //yo chai middleware bata aauxa

    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    //updating the data
    if (fullname) {
      user.fullname = fullname;
    }

    if (email) {
      user.email = email;
    }

    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }

    if (bio) {
      user.profile.bio = bio;
    }

    if (skills) {
      user.profile.skills = skillsArray;
    }

    if (cloudeResponse) {
      user.profile.resume = cloudeResponse.secure_url; //this saves the cloudinary uri
      user.profile.resumeOriginalName = file.originalname; //save the original file name
    }

    // (user.fullname = fullname),
    //   (user.email = email),
    //   (user.phoneNumber = phoneNumber),
    //   (user.profile.bio = bio),
    //   (user.profile.skills = skillsArray);

    await user.save();

    user = {
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
      user,
    });
  } catch (e) {
    console.log("Some error occued in updateprifile block", e);
  }
};
