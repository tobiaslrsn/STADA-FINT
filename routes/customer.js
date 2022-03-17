const express = require("express");
const utils = require("../utils");
const CustomersModel = require("../models/CustomersModel");

const router = express.Router();

router.get("/registrera", (req, res) => {
  res.render("accounts/register");
});

router.post("/register-customer", async (req, res) => {
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

  CustomersModel.findOne({ email }, async (err, customer) => {
    if (customer) {
      res.send("E-post upptagen");
    } else if (password !== confirmPassword) {
      res.send("Lösenordet matchar inte");
    } else {
      const newCustomer = new CustomersModel({
        email,
        password: utils.getHashedPassword(password),
        firstName,
        lastName,
        streetName,
        postalCode,
        city,
      });

      await newCustomer.save();

      res.send("Konto registrerat");
    }
  });
});

module.exports = router;
