import { twitterClientV2 } from "../utils/twitterClient";
export async function postTweet(content: string) {
  try {
    const response = await twitterClientV2.tweet(content);
    console.log("发推成功:", response.data);
    return response.data;
  } catch (error) {
    console.error("发推失败:", error);
    throw error;
  }
}
