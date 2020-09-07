const morgan = require("morgan");
const express = require("express");
const app = express();
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

app.get("/", (req, res) => {
  res.send("Welcome to my first node server.");
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
