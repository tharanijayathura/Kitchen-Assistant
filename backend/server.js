const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db.js");

const app = express();
app.use(cors());
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Kitchen Assistant Backend Running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
