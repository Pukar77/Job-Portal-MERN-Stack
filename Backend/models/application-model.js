import mongoose from "mongoose";

//yo schema job applicants ko ho,(jasle job apply garxa)

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    require: true,
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  status:{
    type:String,
    enum:['pending', 'accepted', 'rejected'],
    default:'pending'
  }
},{timestamps:true});

export const Application = mongoose.model("Application", applicationSchema); 
