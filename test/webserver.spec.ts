import assert from "assert";
import axios from "axios";
import { WebServer } from "../src/WebServer";

describe("WebServer", function () {
  it("should start and stop correctly", async () => {
    const webServer = new WebServer({ port: 3456 });
    await webServer.start();
    // test that it is well started by doing an HTTP request on it.
    const response = await axios.get("http://localhost:3456/api/ping");
    assert(response.status === 200);
    await webServer.stop();
    // test that it is well stopped by doing an HTTP request on it.
    let error = undefined;
    try {
      await axios.get("http://localhost:3456/api/ping");
    } catch (err) {
      error = err;
    }
    assert(error !== undefined);
  });
  it("should return -1 when the value is not present", function () {
    assert.equal([1, 2, 3].indexOf(4), -1);
  });
});
