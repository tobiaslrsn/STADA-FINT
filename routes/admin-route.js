const express = require("express");

const router = express.Router();

const AdminModel = require("../models/AdminModels.js");
const utils = require("../utils.js");

const jwt = require("jsonwebtoken");

const { forceAuthorize } = require("../middlewares/auth.js");
const { objectId } = require("mongodb");

router.get("/register", async (req, res) => {
  /*
  //HÅRKODAD ADMIN
  const test = new AdminModel({
     adminUsername: "admin007",
    adminPassword: utils.getHashedPassword("admin002"),
  });
  await test.save();
  res.send(test); */
  res.render("accounts/admin");
});

//REGISTRERA ADMIN
router.post("/register", async (req, res) => {
  const { adminUsername, adminPassword } = req.body;

  const newAdmin = new AdminModel({
    adminUsername,
    adminPassword: utils.getHashedPassword(adminPassword),
  });

  await newAdmin.save();
  res.sendStatus(200);
});

// ADMIN LOG IN

module.exports = router;
