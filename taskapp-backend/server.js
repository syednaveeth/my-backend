const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Server is working! Use /reddit for Reddit data" });
});

app.get("/reddit", async (req, res) => {
  try {
    const response = await axios.get("https://www.reddit.com/r/reactjs.json", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    res.json(response.data.data.children);
  } catch (err) {
    console.error("Reddit API error:", err.message);
    res.status(500).json({
      error: "Failed to fetch from Reddit",
      details: err.message,
    });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("✅ Server running"));
