const express = require("express");
const router = express.Router();

const CustomersModel = require("../models/CustomersModel.js");
const AdminModel = require("../models/AdminModels.js");
const utils = require("../utils.js");
const jwt = require("jsonwebtoken");
const CleanersModel = require("../models/CleanersModel.js");

// CUSTOMER LOGIN VIEW

router.get("/logga-in", (req, res) => {
  res.render("accounts/login", { customer: true });
});

// CLEANER LOGIN VIEW

router.get("/logga-in-stadare", (req, res) => {
  res.render("accounts/login", { cleaner: true });
});

// ADMIN LOGIN VIEW

router.get("/logga-in-admin", (req, res) => {
  res.render("accounts/login", { admin: true });
});

// CUSTOMER LOGIN

router.post("/logga-in", async (req, res) => {
  const { email, password } = req.body;

  CustomersModel.findOne({ email }, async (err, customer) => {
    if (customer && utils.comparePassword(password, customer.password)) {
      const customerData = {
        customerId: customer._id,
        firstName: customer.firstName,
        email,
      };
      const accessToken = jwt.sign(customerData, process.env.JWT_CUSTOMER);

      res.cookie("customerToken", accessToken);

      await customer.save();
      res.redirect("/");
    }
    if (email !== " " && utils.validateEmailAddress(email) === -1) {
      res.render("accounts/login", {
        emailWrongFormat: "adressen har fel format.",
      });
    } else {
      console.log(err);

      res.render("accounts/login", {
        loginError:
          "Oj, antingen är du inte registrerad eller så skrev du fel.",
        customer: true,
      });
    }
  });
});

// CLEANER LOGIN

router.post("/logga-in-stadare", async (req, res) => {
  const { email, password } = req.body;

  CleanersModel.findOne({ email }, async (err, cleaner) => {
    if (cleaner && utils.comparePassword(password, cleaner.password)) {
      const cleanerData = {
        cleaner: cleaner._id,
        firstName: cleaner.firstName,
        email,
      };

      const accessToken = jwt.sign(cleanerData, process.env.JWT_CLEANER);

      res.cookie("cleanerToken", accessToken);

      await cleaner.save();
      res.redirect("/");
    }
    if (email !== " " && utils.validateEmailAddress(email) === -1) {
      res.render("accounts/login", {
        emailWrongFormat: "adressen har fel format.",
        cleaner: true,
      });
    } else {
      console.log(err);

      res.render("accounts/login", {
        loginError:
          "Oj, antingen är du inte registrerad eller så skrev du fel.",
        cleaner: true,
      });
    }
  });
});

// ADMIN LOGIN

router.post("/logga-in-admin", async (req, res) => {
  const { adminUsername, password } = req.body;

  AdminModel.findOne({ adminUsername }, async (err, admin) => {
    if (admin && utils.comparePassword(password, admin.adminPassword)) {
      const adminData = {
        adminId: admin._id,
        adminUsername: admin.adminUsername,
      };

      const accessToken = jwt.sign(adminData, process.env.JWT_ADMIN);

      res.cookie("adminToken", accessToken);

      await admin.save();
      res.redirect("/logga-in-admin");
    } else {
      console.log(err);

      res.render("accounts/login", {
        loginError:
          "Oj, antingen är du inte registrerad eller så skrev du fel.",
        admin: true,
      });
    }
  });
});

router.post("/log-out", (req, res) => {
  res.cookie("customerToken", "", { maxAge: 0 });
  res.cookie("cleanerToken", "", { maxAge: 0 });
  res.cookie("adminToken", "", { maxAge: 0 });
  res.redirect("/");
});

module.exports = router;
