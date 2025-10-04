const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "Server is working! Use /reddit for Reddit data",
  });
});

app.get("/reddit", async (req, res) => {
  try {
    // Simple fetch without headers
    const response = await fetch("https://www.reddit.com/r/reactjs.json");

    const json = await response.json();
    res.json(json.data.children);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
