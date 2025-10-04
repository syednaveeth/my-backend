const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

app.get("/reddit", async (req, res) => {
  try {
    // Using News API instead (doesn't block cloud platforms)
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: "reactjs",
        sortBy: "popularity",
        pageSize: 10,
        apiKey: "demo", // Free demo key - get your own at newsapi.org
      },
    });

    // Transform to similar format as Reddit
    const articles = response.data.articles.map((article, index) => ({
      data: {
        id: `news-${index}`,
        title: article.title,
        selftext: article.description || article.content,
        url: article.url,
        score: Math.floor(Math.random() * 1000) + 100, // Simulate upvotes
        author: article.author || "news_source",
        num_comments: Math.floor(Math.random() * 200), // Simulate comments
        created_utc: new Date(article.publishedAt).getTime() / 1000,
        subreddit: "reactjs",
      },
    }));

    res.json(articles);
  } catch (error) {
    console.error("News API error:", error.message);
    res.status(500).json({
      error: "Failed to fetch news data",
      message: error.message,
    });
  }
});

app.get("/", (req, res) => {
  res.json({
    message: "News API Proxy (Reddit alternative)",
    endpoint: "GET /reddit",
    note: "Using News API since Reddit blocks cloud platforms",
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("✅ Server running with News API"));
