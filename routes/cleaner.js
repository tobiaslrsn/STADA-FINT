const express = require("express");
const utils = require("../utils");
const CleanersModel = require("../models/CleanersModel");

const router = express.Router();

router.get("/registrera-stadare", (req, res) => {
  res.render("accounts/register");
});

router.post("/registrera-stadare", async (req, res) => {
  const {
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    streetName,
    postalCode,
    city,
  } = req.body;

  CleanersModel.findOne({ email }, async (err, cleaner) => {
    if (cleaner) {
      res.send("E-post upptagen");
    } else if (password !== confirmPassword) {
      res.send("Lösenordet matchar inte");
    } else {
      const newCleaner = new CleanersModel({
        email,
        password: utils.getHashedPassword(password),
        firstName,
        lastName,
        streetName,
        postalCode,
        city,
      });

      await newCleaner.save();

      res.send("Konto registrerat");
    }
  });
});

module.exports = router;
