const express = require("express");
const utils = require("../utils");
const CustomersModel = require("../models/CustomersModel");
const BookingsModel = require("../models/BookingsModel");
const middlewares = require("../middlewares/auth");

const router = express.Router();

// BOOKING VIEW

router.get("/boka-stadning", middlewares.forceAuthorize, (req, res) => {
  res.render("bookings/booking");
});

// BOOK CLEANING

router.post("/boka-stadning", async (req, res) => {
  const { firstName, lastName, streetName, postalCode, city, date } = req.body;

  const customer = await CustomersModel.findById(res.locals.customerId);

  const newBooking = new BookingsModel({
    firstName,
    lastName,
    streetName,
    postalCode,
    city,
    date,
    bookedBy: customer._id,
    assignedTo: null,
  });

  await newBooking.save();

  customer.bookings.push(newBooking);
  customer.save();

  res.redirect("/");
});

module.exports = router;
