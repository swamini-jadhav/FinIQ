import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { getChatResponse } from "./chatbot.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const reply = await getChatResponse(message);
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend running on port 5000");
});
