const express = require("express");

const router = express.Router();

const AdminModel = require("../models/AdminModels.js");
const utils = require("../utils.js");

const jwt = require("jsonwebtoken");

const { forceAuthorize } = require("../middlewares/auth.js");
const { objectId } = require("mongodb");

router.get("/register", async (req, res) => {
  //HÅRKODAD ADMIN
  /* const test = new AdminModel({
    adminUsername: "208127",
    adminPassword: utils.getHashedPassword("password"),
  });
  await test.save();
  res.send(test); */
  res.render("accounts/admin");
});

//REGISTRERA ADMIN
router.post("/register", async (req, res) => {
  const { adminUsername, adminPassword, adminPasswordConfirm } = req.body;

  AdminModel.findOne({ adminUsername }, async (err, admin) => {
    if (admin) {
      res.render("accounts/admin", {
        userNameTaken: "Användarnamnet är upptaget.",
      });
    } else if (adminUsername.length < 6 || adminUsername.length > 6) {
      // res.send("ADMIN USERNAME NEEDS TO BE MORE THAN 6");
      res.render("accounts/admin", {
        usernameLengthError: "Admin ID behöver vara 6 siffror långt",
      });
    } else if (adminPassword !== adminPasswordConfirm) {
      res.send("NOT MATCHING PASSWORDS");
    } else if (adminPassword.length < 8) {
      res.send("PASSWORDS NEED TO HAVE A LENGTH OF 8");
    } else {
      const newAdmin = new AdminModel({
        adminUsername,
        adminPassword: utils.hashedPassword(adminPassword),
      });

      await newAdmin.save();
      res.redirect("/");
    }
  });
});

// ADMIN LOG IN

module.exports = router;
