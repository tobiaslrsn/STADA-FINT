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
  const {
    firstName,
    lastName,
    streetName,
    postalCode,
    city,
    date,
    cleaningOption,
    message,
  } = req.body;

  if (firstName < 1) {
    res.render("bookings/booking", {
      firstNameEmpty: "Du kan inte lämna fältet tomt!",
    });
  } else if (lastName < 1) {
    res.render("bookings/booking", {
      lastNameEpty: "Du kan inte lämna fältet tomt!",
    });
  } else if (streetName < 1) {
    res.render("bookings/booking", {
      adressEmpty: "Vi behöver din adress för att städa!",
    });
  } else if (postalCode < 1) {
    res.render("bookings/booking", {
      postalCodeEmpty: "Fyll i ditt postnummer",
    });
  } else if (city < 1) {
    res.render("bookings/booking", {
      enterCity: "Välj din stad!",
    });
  } else if (date < 1) {
    res.render("bookings/booking", {
      chooseDate: "Du måste välja ett datum!",
    });
  } else if (
    cleaningOption != "Basic städning" &&
    cleaningOption != "Topp städning" &&
    cleaningOption != "Diamant städning" &&
    cleaningOption != "Fönstertvätt"
  ) {
    res.render("bookings/booking", {
      chooseCleaning: "Du måste välja vilken städning du vill ha!",
    });
  } else {
    const customer = await CustomersModel.findById(res.locals.customerId);

    const newBooking = new BookingsModel({
      firstName,
      lastName,
      streetName,
      postalCode,
      city,
      date,
      cleaningOption,
      message,
      bookedBy: customer._id,
    });

    await newBooking.save();

    customer.bookings.push(newBooking);
    customer.save();

    res.redirect("/");
  }
});

// VIEW BOOKINGS

router.get("/dina-bokningar", async (req, res) => {
  const customer = await CustomersModel.findById(res.locals.customerId)
    .populate("bookings")
    .lean();

  const bookings = customer.bookings;

  res.render("bookings/all-bookings", { bookings });
});

// VIEW SINGLE BOOKING

router.get("/din-bokning/:id", async (req, res) => {
  const booking = await BookingsModel.findById(req.params.id);

  res.render("bookings/single-booking", booking);
});

module.exports = router;
