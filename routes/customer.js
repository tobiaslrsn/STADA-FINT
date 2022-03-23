const express = require("express");
const utils = require("../utils");
const CustomersModel = require("../models/CustomersModel");

const router = express.Router();

// BOOKING VIEW

router.get("/boka-stadning", (req, res) => {
  res.render("bookings/booking");
});

// BOOK CLEANING

router.post("/boka-stadning", async (req, res) => {
  const { firstName, lastName, streetName, postalCode, city, date } = req.body;

  const newBooking = {
    firstName,
    lastName,
    streetName,
    postalCode,
    city,
    date,
  };
});

module.exports = router;
