const express = require("express");
const router = express.Router();
const ctrl = require("./user.ctrl");

// app.get("/users", (req, res) => {
router.get("/", ctrl.index);
router.get("/:id", ctrl.show);
router.delete("/:id", ctrl.remove);
router.post("/", ctrl.create);
router.put("/:id", ctrl.update);

module.exports = router;
