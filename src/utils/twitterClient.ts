import { TwitterApi } from "twitter-api-v2";
import { HttpsProxyAgent } from "https-proxy-agent";
import { env } from "../config/env";

// 创建代理agent（如果配置了代理）
const proxyAgent = env.httpProxy
  ? new HttpsProxyAgent(env.httpProxy)
  : undefined;

// 初始化并导出Twitter客户端实例
export const twitterClient = new TwitterApi(
  {
    appKey: env.twitterAppKey,
    appSecret: env.twitterAppSecret,
    accessToken: env.twitterAccessToken,
    accessSecret: env.twitterAccessSecret,
  },
  // 代理配置
  { httpAgent: proxyAgent }
);

// 导出v2客户端快捷方式
export const twitterClientV2 = twitterClient.v2;
