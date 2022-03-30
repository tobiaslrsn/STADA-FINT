// MODULES

const express = require("express");
const utils = require("../utils");
const CleanersModel = require("../models/CleanersModel");
const CustomersModel = require("../models/CustomersModel");

const router = express.Router();

// REGISTRATION VIEW

// CLEANER

router.get("/registrera-stadare", (req, res) => {
  res.render("accounts/register");
});

// CUSTOMER

router.get("/registrera-konto", (req, res) => {
  res.render("accounts/register", { customer: true });
});

// REGISTER CLEANER

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
      res.render("accounts/register", {
        emailTaken: "E-post adressen är upptagen.",
      });
    } else if (password !== confirmPassword) {
      res.render("accounts/register", {
        passDontMatch: "Lösenorden matchar inte!",
      });
    } else if (password < 1) {
      res.render("accounts/register", {
        passwordEmpty: "Du måste fylla i ett lösenord.",
      });
    } else if (password < 5) {
      res.render("accounts/register", {
        passwordToShort: "Lösenordet behöver vara minst 5 tecken.",
      });
    } else if (email !== " " && utils.validateEmailAddress(email) === -1) {
      res.render("accounts/register", {
        emailValid: "Skriv in din mail i rätt format",
      });
    } else if (firstName < 1) {
      res.render("accounts/register", {
        firstNameEmpty: "Du kan inte lämna fältet tomt!",
      });
    } else if (lastName < 1) {
      res.render("accounts/register", {
        lastNameEpty: "Du kan inte lämna fältet tomt!",
      });
    } else if (streetName < 1) {
      res.render("accounts/register", {
        adressEmpty: "Vi behöver din adress för att städa!",
      });
    } else if (postalCode < 1) {
      res.render("accounts/register", {
        postalCodeEmpty: "Fyll i ditt postnummer",
      });
    } else if (city < 0) {
      res.render("accounts/register", {
        enterCity: "Välj din stad!",
      });
    } else {
      const newCleaner = new CleanersModel({
        email,
        password: utils.hashedPassword(password),
        firstName,
        lastName,
        streetName,
        postalCode,
        city,
      });

      if (utils.validateRegistration(newCleaner)) {
        await newCleaner.save();

        res.redirect("/");
      } else {
        res.send("Something went wrong");
      }
    }
  });
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

        res.redirect("/"); // REDIRECT TILL STÄDARENS SIDA MED UPPDRAG
      } else {
        res.send("Something went wrong");
      }
    }
  });
});

router.get("/personal-inlogg", (req, res) => {
  res.render("accounts/login-cleaner");
});

module.exports = router;
