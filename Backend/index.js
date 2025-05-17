import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./dbconnection/db.js";
import userRoute from "./routes/user-route.js";
import companyRoute from "./routes/company-route.js";
import jobRoute from "./routes/job-route.js"
dotenv.config();

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOption));

//database connection
connectDB();

const PORT = process.env.PORT;

//routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);

app.listen(PORT, () => {
  console.log(`Server is runing at port ${PORT}`);
});
