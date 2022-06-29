import assert from "assert";
import axios from "axios";
import { Article } from "../src/interfaces/article";
import { WebServer } from "../src/WebServer";

const url = "http://localhost:3456/api/articles";

describe("WebServer", function () {
  const webServer = new WebServer({ port: 3456 });
  before(async () => {
    await webServer.start();
  });
  after(async () => {
    await webServer.stop();
  });

  it("should get all articles", async () => {
    const response = await axios.get(url);
    const articles = response.data as Article[];
    assert(articles instanceof Array);
  });
});
