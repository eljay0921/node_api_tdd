const morgan = require("morgan");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

let users = [
  {
    id: 1,
    name: "jin",
  },
  {
    id: 2,
    name: "syeon",
  },
  {
    id: 3,
    name: "whatthef",
  },
];

app.use(morgan("dev"));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => {
  res.send("Welcome to my first node server.");
});

app.get("/users", (req, res) => {
  const limit = parseInt(req.query.limit ?? 10, 10);
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }

  res.json(users.slice(0, limit));
});

app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }

  const targetUsers = users.filter((user) => user.id === id);
  if (targetUsers.length < 1) {
    return res.status(404).end();
  }

  res.json(targetUsers[0]);
});

app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }

  const remainUsers = users.filter((user) => user.id !== id);
  return res.status(204).end();
});

app.post("/users", (req, res) => {
  const name = req.body.name;
  const id = Date.now();
  const user = { id, name };
  users.push(user);

  res.status(201).json(user).end();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
