import express from "express";
import { Article } from "./interfaces/article";

const generateId = (): string => {
  return String(Date.now() + "_" + Math.floor(Math.random() * 1e12));
};

const articles: Article[] = [
  { id: "a1", name: "Tournevis", qty: 100, price: 2.34 },
  { id: "a2", name: "Pelle", qty: 123, price: 12 },
];

const app = express.Router();

app.get("/", (req, res) => {
  res.json(articles);
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  const article = articles.find((a) => a.id === id);
  if (article === undefined) {
    res.status(404).end();
    return;
  }
  res.json(article);
});

app.use(express.json());

app.post("/", (req, res) => {
  try {
    const article = req.body as Article;
    article.id = generateId();
    articles.push(article);
    res.status(201).json({ id: article.id });
  } catch (err) {
    console.log("err: ", err);
    res.status(500).end();
  }
});

export const articleRouter = app;
