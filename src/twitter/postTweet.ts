import { TwitterApi } from "twitter-api-v2";
import { HttpsProxyAgent } from "https-proxy-agent";
import { env } from "../config/env";

// 创建代理agent（如果配置了代理）
const proxyAgent = env.httpProxy
  ? new HttpsProxyAgent(env.httpProxy)
  : undefined;

const client = new TwitterApi(
  {
    appKey: env.twitterAppKey,
    appSecret: env.twitterAppSecret,
    accessToken: env.twitterAccessToken,
    accessSecret: env.twitterAccessSecret,
  },
  { httpAgent: proxyAgent }
);

export async function postTweet(content: string) {
  try {
    const response = await client.v2.tweet(content);
    console.log("发推成功:", response.data);
    return response.data;
  } catch (error) {
    console.error("发推失败:", error);
    throw error;
  }
}
