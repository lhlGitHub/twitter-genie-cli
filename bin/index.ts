#!/usr/bin/env ts-node

import { Command } from "commander";
import inquirer from "inquirer";
import { fetchLatestTweets } from "../src/twitter/fetchTweets";
import { rewriteTweet } from "../src/ai/rewrite";
import { postTweet } from "../src/twitter/postTweet";
import chalk from "chalk";

const program = new Command();

program
  .name("twitter-genie")
  .description("输入 KOL 账号，爬取并重写推文")
  .version("0.1.0");

program
  .argument("[username]", "KOL 用户名（不含 @）")
  .action(async (username: string) => {
    try {
      if (!username) {
        const answers = await inquirer.prompt([
          {
            type: "input",
            name: "username",
            message: "请输入 KOL 用户名（不含 @）",
          },
        ]);
        username = answers.username;
      }

      console.log(chalk.blue(`正在获取 @${username} 的推文...`));
      const tweets = await fetchLatestTweets(username);
      const tweet = tweets[0];

      console.log(chalk.blue(`📝 原始推文: ${tweet.text}`));

      console.log(chalk.yellow("正在重写推文..."));
      const newTweet = await rewriteTweet(tweet.text);
      console.log(chalk.green(`🤖 新推文: ${newTweet}`));

      const answers = await inquirer.prompt([
        { type: "confirm", name: "shouldPost", message: "是否自动发推？" },
      ]);

      if (answers.shouldPost) {
        await postTweet(newTweet);
        console.log(chalk.yellow("✅ 已发布"));
      }
    } catch (error) {
      console.error(chalk.red("错误:"), error);
      process.exit(1);
    }
  });

program.parse();
