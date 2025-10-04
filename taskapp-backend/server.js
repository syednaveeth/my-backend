const express = require("express");
const cors = require("cors");
const https = require("https");

const app = express();
app.use(cors());

app.get("/reddit", (req, res) => {
  console.log("🔄 Starting fetch from: https://www.reddit.com/r/reactjs.json");

  const options = {
    hostname: "www.reddit.com",
    path: "/r/reactjs.json?limit=10",
    method: "GET",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      Accept: "application/json",
    },
    timeout: 15000,
  };

  const request = https.request(options, (redditRes) => {
    console.log(`📡 Reddit response status: ${redditRes.statusCode}`);
    console.log("📡 Response headers:", redditRes.headers);

    let data = "";

    redditRes.on("data", (chunk) => {
      data += chunk;
    });

    redditRes.on("end", () => {
      console.log(`📦 Received ${data.length} bytes of data`);

      // Log first 200 chars to see what we're getting
      console.log("📄 Data preview:", data.substring(0, 200));

      try {
        const jsonData = JSON.parse(data);

        if (jsonData.data && jsonData.data.children) {
          console.log(
            `✅ SUCCESS: Got ${jsonData.data.children.length} posts from Reddit`
          );
          res.json({
            source: "https://www.reddit.com/r/reactjs.json",
            postCount: jsonData.data.children.length,
            data: jsonData.data.children,
          });
        } else {
          console.log("❌ Unexpected data format:", jsonData);
          res.status(500).json({
            error: "Reddit returned unexpected format",
            receivedData: jsonData,
          });
        }
      } catch (error) {
        console.log(
          "❌ JSON parse error - data is not JSON:",
          data.substring(0, 500)
        );
        res.status(500).json({
          error: "Failed to parse Reddit response as JSON",
          rawData: data.substring(0, 500) + "...",
        });
      }
    });
  });

  request.on("error", (error) => {
    console.log("❌ Request error:", error.message);
    res.status(500).json({
      error: "Cannot connect to Reddit",
      message: error.message,
      target: "https://www.reddit.com/r/reactjs.json",
    });
  });

  request.on("timeout", () => {
    console.log("❌ Request timeout");
    request.destroy();
    res.status(500).json({
      error: "Request timeout",
      target: "https://www.reddit.com/r/reactjs.json",
    });
  });

  request.end();
});

app.get("/", (req, res) => {
  res.json({
    message: "Direct Reddit API Fetcher",
    endpoint: "GET /reddit",
    target: "https://www.reddit.com/r/reactjs.json",
    description: "Fetches directly from Reddit API with full debugging",
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () =>
  console.log("✅ Server running - Direct Reddit fetcher")
);
