const express = require("express");
const utils = require("../utils");
const CustomersModel = require("../models/CustomersModel");

const router = express.Router();

router.get("/boka-stadning", async (req, res) => {
  console.log(res.locals.customerId);

  res.render("bookings/booking");
});
// REGISTRATION VIEW

router.get("/registrera-konto", (req, res) => {
  res.render("accounts/register", { customer: true });
});

// REGISTER CUSTOMER

router.post("/registrera-kund", async (req, res) => {
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
    } else if (firstName <= 1) {
      res.render("accounts/register", {
        usernameToShort: "Användarnamnet måste vara mer än 1 bokstav",
      });
    } else if (lastName <= 1 && lastName >= 4) {
      res.render("accounts/register", {
        lastnameError: "Efternamn måste vara mer än 1 bokstav",
      });
    } else if (password !== confirmPassword) {
      res.send("Lösenordet matchar inte");
    } else if (email !== " " && utils.validateEmailAddress(email) === -1) {
      res.send("SLUTA");
    } else {
      const newCustomer = new CustomersModel({
        email,
        password: utils.hashedPassword(password),
        firstName,
        lastName,
        streetName,
        postalCode,
        city,
      });

      if (utils.validateRegistration(newCustomer)) {
        await newCustomer.save();

        res.redirect("/login");
      } else {
        res.render("accounts/register", {
          somethingWentWrong: "Ajdå, här blev något fel!",
        });
      }
    }
  });
});

module.exports = router;
