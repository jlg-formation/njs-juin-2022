import express from "express";
import { Server } from "http";
import { articleRouter } from "./articles.router";

export const api = (server: Server) => {
  const app = express.Router();

  app.use("/articles", articleRouter(server));

  app.get("/ping", (req, res) => {
    res.json({ test: "ok" });
  });
  app.get("/crash", (req, res) => {
    (async () => {
      throw new Error("crash...");
    })();
  });

  return app;
};
