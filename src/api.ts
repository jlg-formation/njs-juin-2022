import express from "express";
import { Server } from "http";
import { articleRouter } from "./articles.router";

export const api = (server: Server) => {
  const app = express.Router();

  app.use("/articles", articleRouter);

  app.get("/ping", (req, res) => {
    res.json({ test: "ok" });
  });

  return app;
};
