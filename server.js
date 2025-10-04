const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Server is working!" });
});

app.get("/reddit", (req, res) => {
  const mockData = [
    {
      data: {
        title: "React is awesome!",
        selftext: "Learning React hooks and components",
        url: "https://reactjs.org",
        score: 150,
        author: "react_fan",
      },
    },
    {
      data: {
        title: "New React Features",
        selftext: "Check out the latest React updates",
        url: "https://reactjs.org/blog",
        score: 89,
        author: "react_dev",
      },
    },
  ];

  res.json(mockData);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("✅ Server running"));
