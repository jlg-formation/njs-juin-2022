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

  it("should delete all articles", async () => {
    // add 2 articles and delete them.
    await axios.post(url, newArticle);
    await axios.post(url, newArticle);

    let response = await axios.get(url);
    let articles = response.data as Article[];
    assert(articles.length >= 2);

    await axios.delete(url);
    response = await axios.get(url);
    articles = response.data as Article[];
    assert(articles.length === 0);
  });

  it("should delete one article", async () => {
    // add 1 article and delete it.
    let response = await axios.post(url, newArticle);
    const id = (response.data as { id: string }).id;
    assert(id);

    response = await axios.delete(url + "/" + id);
    assert(response.status === 204);

    response = await axios.get(url + "/" + id, {
      validateStatus: null,
    });
    assert(response.status === 404);
  });
});
