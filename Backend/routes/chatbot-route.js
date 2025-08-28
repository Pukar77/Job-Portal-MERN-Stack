import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

// Set up Google Generative AI model using API key from .env
const genAI = new GoogleGenerativeAI(process.env.API_KEY1);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Function to generate content
const generate = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// POST endpoint to generate content
router.post("/content", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({
      message: "Please provide a prompt",
    });
  }

  try {
    const generated_text = await generate(prompt);
    return res.json({
      generated_text,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Failed to generate content",
    });
  }
});

export default router;
