import express from "express";
import { articleRouter } from "./articles.router";

const app = express.Router();

app.use("/articles", articleRouter);

app.get("/ping", (req, res) => {
  res.json({ test: "ok" });
});

export const api = app;
