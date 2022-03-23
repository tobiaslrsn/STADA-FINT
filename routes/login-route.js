const express = require("express");
const router = express.Router();

const CustomersModel = require("../models/CustomersModel.js");
const utils = require("../utils.js");
const jwt = require("jsonwebtoken");

router.get("/login", async (req, res) => {
  await CustomersModel.findById(res.locals.userId).lean();

  res.render("accounts/login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  CustomersModel.findOne({ email }, async (err, customer) => {
    if (customer && utils.comparePassword(password, customer.password)) {
      const userData = { customerId: customer._id, email };

      const accessToken = jwt.sign(userData, process.env.JWTSECRET);

      res.cookie("token", accessToken);

      await customer.save();
      res.redirect("/");
    } else {
      console.log(err);

      res.send("Couldn't sign in with provided details");
    }
  });
});

router.post("/log-out", (req, res) => {
  res.cookie("token", "", { maxAge: 0 });
  res.redirect("/");
});

module.exports = router;
