import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("database connected successfully");
  } catch (e) {
    console.log("Some error occured while connecting to database", e);
  }
};

export default connectDB;
