const express = require("express");
const router = express.Router();

const utils = require("../utils.js");
const jwt = require("jsonwebtoken");

router.get("/ditt-schema", (req, res) => {
  res.render("accounts/cleaner-schedule");
});

module.exports = router;
