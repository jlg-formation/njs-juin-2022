console.log("About to start the server...");

import express from "express";
import serveIndex from "serve-index";

import { api } from "./api";

const port = 3000;
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

app.listen(port, () => {
  console.log(`Server started with success on port ${port}`);
});
