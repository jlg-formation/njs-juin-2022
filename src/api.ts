import express from "express";

const app = express.Router();

app.get("/test", (req, res) => {
  res.json({ test: "ok" });
});

export const api = app;
