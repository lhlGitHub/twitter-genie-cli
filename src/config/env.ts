import dotenv from "dotenv";
dotenv.config();

export const env = {
  openRouterApiKey: process.env.OPENROUTER_API_KEY || "",
  twitterAppKey: process.env.TWITTER_APP_KEY || "",
  twitterAppSecret: process.env.TWITTER_APP_SECRET || "",
  twitterAccessToken: process.env.TWITTER_ACCESS_TOKEN || "",
  twitterAccessSecret: process.env.TWITTER_ACCESS_SECRET || "",
  httpProxy: process.env.HTTP_PROXY || "",
};
