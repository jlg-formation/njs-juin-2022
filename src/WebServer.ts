import express from "express";
import { createServer, Server } from "http";
import morgan from "morgan";
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
    this.server = createServer(app);

    app.use(morgan("tiny"));

    app.use("/toto/titi", (req, res) => {
      res.json({ toto: "titi" });
    });

    app.use("/api", api(this.server));

    app.use(express.static("."));
    app.use(serveIndex(".", { icons: true }));
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
    return new Promise((resolve, reject) => {
      this.server.close((err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  }
}
