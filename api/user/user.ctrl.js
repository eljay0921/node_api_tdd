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

const index = (req, res) => {
  const limit = parseInt(req.query.limit ?? 10, 10);
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }

  res.json(users.slice(0, limit));
};

const show = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }

  const targetUsers = users.filter((user) => user.id === id);
  if (targetUsers.length < 1) {
    return res.status(404).end();
  }

  res.json(targetUsers[0]);
};

const remove = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }

  const remainUsers = users.filter((user) => user.id !== id);
  return res.status(204).end();
};

const create = (req, res) => {
  const name = req.body.name;
  if (!name) {
    return res.status(400).end();
  }

  if (users.find((item) => item.name === name)) {
    return res.status(409).end();
  }

  const id = Date.now();
  const user = { id, name };
  users.push(user);

  res.status(201).json(user).end();
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
