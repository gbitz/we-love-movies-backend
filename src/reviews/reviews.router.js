const router = require("express").Router();
const controller = require("/reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
    .all(methodNotAllowed)

module.exports = router;