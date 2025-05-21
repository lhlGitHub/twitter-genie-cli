import { twitterClientV2 } from "../utils/twitterClient";

export async function fetchLatestTweets(username: string) {
  try {
    console.log("正在获取用户信息...");

    // 1. 获取用户信息
    const user = await twitterClientV2.userByUsername(username, {
      "user.fields": ["id", "username", "name"],
    });

    if (!user.data) {
      throw new Error(`用户 @${username} 不存在`);
    }

    console.log("找到用户:", user.data.username);

    // 2. 获取用户最新推文
    const tweets = await twitterClientV2.userTimeline(user.data.id, {
      max_results: 5,
      "tweet.fields": ["created_at", "public_metrics"],
    });

    if (!tweets.data.data || tweets.data.data.length === 0) {
      throw new Error(`未找到 @${username} 的推文`);
    }

    return tweets.data.data;
  } catch (error) {
    console.error(`获取 @${username} 的推文失败:`);

    if (error instanceof Error) {
      if ("code" in error) {
        switch (error.code) {
          case "ETIMEDOUT":
          case "ECONNRESET":
            console.error("连接超时，请检查网络连接或代理设置");
            break;
          case 401:
            console.error("认证失败，请检查API密钥");
            break;
          case 404:
            console.error("用户或资源不存在");
            break;
          case 429:
            console.error("API请求次数超限，请稍后再试");
            break;
          default:
            console.error("API错误:", error.message);
        }
      } else {
        console.error("完整错误:", error.message);
      }
    } else {
      console.error("未知错误:", error);
    }

    throw error;
  }
}
