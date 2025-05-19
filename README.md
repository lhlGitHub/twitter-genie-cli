# Twitter 洗稿 CLI 工具

这是一个简单的命令行工具，用于从 Twitter 获取推文并使用 OpenAI 的 API 进行推文重写。该工具可以帮助用户获取特定用户的最新推文，并对其进行改写，以提高传播力。

## 功能

- 获取指定用户的最新推文
- 使用 OpenAI API 对推文进行重写
- 支持代理设置以处理网络问题

## 使用技术&插件

- Node.js
- TypeScript
- OpenAI API
- Twitter API
- Axios
- Chalk
- Commander
- Dotenv
- HTTPS Proxy Agent
- Inquirer
- TypeScript

## 安装

1. 克隆此仓库：

   ```bash
   git clone https://github.com/lhlGitHub/twitter-genie-cli
   cd twitter-genie-cli
   ```

2. 安装依赖：

   ```bash
   npm install
   ```

3. 创建 `.env` 文件并添加您的 API 密钥：
   ```plaintext
   OPENROUTER_API_KEY=your_openrouter_api_key
   TWITTER_APP_KEY=your_twitter_app_key
   TWITTER_APP_SECRET=your_twitter_app_secret
   TWITTER_ACCESS_TOKEN=your_twitter_access_token
   TWITTER_ACCESS_SECRET=your_twitter_access_secret
   HTTP_PROXY=http://your_proxy:port  # 可选
   ```

## 使用

运行以下命令以获取用户的最新推文并进行重写：

```bash
npx ts-node ./bin/index.ts [username]
```

如果未提供用户名，程序将提示您输入。

## 代码结构

- `src/ai/rewrite.ts`：使用 OpenAI API 进行推文重写的逻辑。
- `src/twitter/fetchTweets.ts`：获取 Twitter 用户推文的逻辑。
- `src/twitter/postTweet.ts`：发布推文的逻辑。
- `src/config/env.ts`：环境变量配置。
- `bin/index.ts`：CLI 入口文件。

## 贡献

欢迎任何形式的贡献！请提交问题或拉取请求。
