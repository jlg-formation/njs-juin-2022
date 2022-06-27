console.log("About to start the server...");

const express = require("express");
const serveIndex = require("serve-index");
const port = 3000;

const app = express();

app.use((req, res, next) => {
  console.log("req: ", req.ur1);
  next();
});

app.use("/toto/titi", (req, res, next) => {
  res.json({ toto: "titi" });
});

app.use(express.static("."));
app.use(serveIndex(".", { icons: true }));

app.listen(port, () => {
  console.log("Server started with success on port " + port);
});
