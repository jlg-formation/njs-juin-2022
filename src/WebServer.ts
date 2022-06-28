import { WebServerOptions } from "./interfaces/WebServerOptions";

export class WebServer {
  constructor(options?: WebServerOptions) {}

  start(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  stop(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
