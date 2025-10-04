const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // allow browser to call this server

// Add a root route
app.get("/", (req, res) => {
  res.json({
    message: "Reddit API Proxy Server",
    usage: "Use /reddit endpoint to fetch ReactJS posts",
    example: "GET https://my-backend-api-lwf7.onrender.com/reddit",
  });
});

app.get("/reddit", async (req, res) => {
  try {
    const response = await fetch("https://www.reddit.com/r/reactjs.json", {
      headers: { "User-Agent": "MyRedditClient/1.0" },
    });

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Reddit returned an error" });
    }

    const json = await response.json();

    // Send only the children array (each item has `data` with title, selftext_html, url, score)
    res.json(json.data.children);
  } catch (err) {
    console.error("Server fetch error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Use environment port for Render, fallback to 5000 for local development
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
