console.log("About to start the server...");

const express = require("express");
const port = 3000;

const app = express();

app.use("/toto/titi", (req, res, next) => {
  console.log("req: ", req.url);
  res.json({ toto: "titi" });
});

app.listen(port, () => {
  console.log("Server started with success on port " + port);
});
