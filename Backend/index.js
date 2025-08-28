import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./dbconnection/db.js";
import userRoute from "./routes/user-route.js";
import companyRoute from "./routes/company-route.js";
import jobRoute from "./routes/job-route.js";
import applicationRoute from "./routes/application-route.js";
import chatbot from "./routes/chatbot-route.js";
dotenv.config();
import path from "path";
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Serve uploads folder statically
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

//database connection
connectDB();

const PORT = process.env.PORT;

//routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/genai", chatbot);

app.listen(PORT, () => {
  console.log(`Server is runing at port ${PORT}`);
});
