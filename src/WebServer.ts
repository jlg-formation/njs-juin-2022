import express, { Express } from "express";
import { createServer, Server } from "http";
import serveIndex from "serve-index";
import { api } from "./api";
import { WebServerOptions } from "./interfaces/WebServerOptions";

export class WebServer {
  options: WebServerOptions = {
    port: 3000,
  };
  server: Server;

  constructor(options?: WebServerOptions) {
    // this.options = { ...this.options, ...options };
    Object.assign(this.options, options);

    const app = express();

    app.use((req, res, next) => {
      console.log("req: ", req.url);
      next();
    });

    app.use("/toto/titi", (req, res, next) => {
      res.json({ toto: "titi" });
    });

    app.use("/api", api);

    app.use(express.static("."));
    app.use(serveIndex(".", { icons: true }));

    this.server = createServer(app);
  }

  start(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.server.once("error", (err) => {
        console.log("err: ", err);
        reject(err);
      });
      this.server.listen(this.options.port, () => {
        console.log(`Server started with success on port ${this.options.port}`);
        resolve();
      });
    });
  }

  stop(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
