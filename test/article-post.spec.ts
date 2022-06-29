import assert from "assert";
import axios from "axios";
import { Article } from "../src/interfaces/article";
import { WebServer } from "../src/WebServer";
import { newArticle } from "./data/articles.data";

const url = "http://localhost:3456/api/articles";

describe("WebServer", function () {
  const webServer = new WebServer({ port: 3456 });
  before(async () => {
    await webServer.start();
  });
  after(async () => {
    await webServer.stop();
  });

  it("should create one article", async () => {
    const response = await axios.post<{ id: string }>(url, newArticle);
    const { id } = response.data;
    const response2 = await axios.get<Article>(url + "/" + id);
    const article = response2.data;
    console.log("article: ", article);
    assert(article.id === id);
  });
});
