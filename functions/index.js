const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors({ origin: true }));

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
    res.json(json.data.children);
  } catch (err) {
    console.error("Server fetch error:", err);
    res.status(500).json({ error: err.message });
  }
});

exports.api = functions.https.onRequest(app);
