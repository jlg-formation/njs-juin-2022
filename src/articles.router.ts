import express from "express";
import { Article } from "./interfaces/article";
import { MariaDBService } from "./services/MariaDBService";

// const generateId = (): string => {
//   return String(Date.now() + "_" + Math.floor(Math.random() * 1e12));
// };

let articles: Article[] = [
  { id: "a1", name: "Tournevis", qty: 100, price: 2.34 },
  { id: "a2", name: "Pelle", qty: 123, price: 12 },
];

const service = new MariaDBService();

const app = express.Router();

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
  try {
    articles.length = 0;
    res.status(204).end();
  } catch (err) {
    console.log("err: ", err);
    res.status(500).end();
  }
});

app.delete("/:id", (req, res) => {
  try {
    const id = req.params.id;
    articles = articles.filter((a) => a.id !== id);
    res.status(204).end();
  } catch (err) {
    console.log("err: ", err);
    res.status(500).end();
  }
});

export const articleRouter = app;
