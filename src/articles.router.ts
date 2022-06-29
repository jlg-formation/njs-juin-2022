import express from "express";
import { Server } from "http";
import { Article } from "./interfaces/article";
import { SequelizeService } from "./services/SequelizeService";

export const articleRouter = (server: Server) => {
  // const service = new MariaDBService(server);
  const service = new SequelizeService(server);

  let isReady = false;
  (async () => {
    await service.init();
    isReady = true;
  })();

  const app = express.Router();

  app.use((req, res, next) => {
    if (isReady) {
      next();
    }
    service.eventEmmitter.on("isReady", () => {
      console.log("received isReady");
      isReady = true;
      next();
    });
  });

  app.get("/", (req, res) => {
    (async () => {
      try {
        const articles = await service.retrieveAllArticle();
        res.json(articles);
      } catch (err) {
        console.log("err: ", err);
        res.status(500).end();
      }
    })();
  });

  app.get("/:id", (req, res) => {
    (async () => {
      try {
        const id = req.params.id;
        const article = await service.retrieveOneArticle(id);
        if (article === undefined) {
          res.status(404).end();
          return;
        }
        res.json(article);
      } catch (err) {
        console.log("err: ", err);
        res.status(500).end();
      }
    })();
  });

  app.use(express.json());

  app.post("/", (req, res) => {
    (async () => {
      try {
        const article = req.body as Article;
        const { id } = await service.createOneArticle(article);
        res.status(201).json({ id });
      } catch (err) {
        console.log("err: ", err);
        res.status(500).end();
      }
    })();
  });

  app.delete("/", (req, res) => {
    (async () => {
      try {
        await service.deleteAllArticle();
        res.status(204).end();
      } catch (err) {
        console.log("err: ", err);
        res.status(500).end();
      }
    })();
  });

  app.delete("/:id", (req, res) => {
    (async () => {
      try {
        const id = req.params.id;
        await service.deleteOneArticle(id);
        res.status(204).end();
      } catch (err) {
        console.log("err: ", err);
        res.status(500).end();
      }
    })();
  });

  return app;
};
