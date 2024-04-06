const express = require("express");

const router = express.Router();

router.get("/register", (req, res) => {
  res.send("Hello World Message");
});

router.get("/login", (req, res) => {
  res.send("Hello World Message");
});

router.get("/posts", (req, res) => {
  res.send("Hello World Message");
});

export default router;
