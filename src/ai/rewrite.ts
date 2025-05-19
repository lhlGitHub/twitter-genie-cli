import OpenAI from "openai";
import dotenv from "dotenv";
import { env } from "../config/env";
dotenv.config();

const openai = new OpenAI({
  apiKey: env.openRouterApiKey,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function rewriteTweet(tweet: string): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: "mistralai/mistral-7b-instruct",
    messages: [
      {
        role: "system",
        content:
          "你是一位社交媒体运营专家，请重新修改内容(不要修改语言)，使其更具传播力，但不要改变其核心意思。",
      },
      { role: "user", content: tweet },
    ],
  });
  console.log("completion", completion);
  return completion.choices[0].message?.content?.trim() || "";
}
