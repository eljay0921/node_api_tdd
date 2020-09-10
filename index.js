const morgan = require("morgan");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const user = require("./api/user/index");

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => {
  res.send("Welcome to my first node server.");
});

app.use("/users", user);

module.exports = app;
