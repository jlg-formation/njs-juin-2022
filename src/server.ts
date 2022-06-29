import { WebServer } from "./WebServer";

console.log("About to start the server...");

(async () => {
  try {
    const server = new WebServer({ port: +(process.env.GSTOCK_PORT || 3000) });
    await server.start();
  } catch (err) {
    console.log("err: ", err);
  }
})();
