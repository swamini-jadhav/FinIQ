import OpenAI from "openai";
import { systemPrompt } from "./prompt.js";

export async function getChatResponse(userMessage) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is missing");
  }

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const safeMessage = `
Explain in beginner friendly language:

${userMessage}
`;

  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: safeMessage }
    ],
    temperature: 0.3,
    max_tokens: 300
  });

  return response.choices[0].message.content;
}
