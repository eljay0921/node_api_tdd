const models = require("../../models");
const { json } = require("body-parser");

const index = (req, res) => {
  const limit = parseInt(req.query.limit ?? 10, 10);
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }

  models.Users.findAll({
    limit,
  }).then((users) => {
    res.json(users);
  });
};

const show = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }

  models.Users.findOne({
    where: {
      id,
    },
  }).then((user) => {
    if (!user) {
      return res.status(404).end();
    } else {
      return res.json(user);
    }
  });
};

const remove = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }

  models.Users.destroy({ where: { id } });
  return res.status(204).end();
};

const create = (req, res) => {
  const name = req.body.name;
  if (!name) {
    return res.status(400).end();
  }

  models.Users.create({ name })
    .then((user) => {
      return res.status(201).json(user).end();
    })
    .catch((err) => {
      if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(409).end();
      } else {
        return res.status(500).end();
      }
    });
};

const update = (req, res) => {
  const id = parseInt(req.params.id);
  const name = req.body.name;

  if (Number.isNaN(id) || !name) {
    return res.status(400).end();
  }

  if (users.find((user) => user.name === name)) {
    return res.status(409).end();
  }

  let updatedUserInfo;
  users.forEach((user, idx) => {
    if (user.id === id) {
      users[idx].name = name;
      updatedUserInfo = users[idx];
    }
  });

  if (!updatedUserInfo) {
    return res.status(404).end();
  }

  res.json(updatedUserInfo);
};

module.exports = {
  index,
  show,
  remove,
  create,
  update,
};
