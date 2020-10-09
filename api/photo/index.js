const express = require("express");
const router = express.Router();
const ctrl = require("./photo.ctrl");

router.get("/", ctrl.index);

module.exports = router;