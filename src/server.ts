import { WebServer } from "./WebServer";

console.log("About to start the server...");

(async () => {
  try {
    const server = new WebServer();
    await server.start();
  } catch (err) {
    console.log("err: ", err);
  }
})();
