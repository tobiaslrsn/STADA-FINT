const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  streetName: { type: String, required: true },
  postalCode: { type: String, required: true },
  city: { type: String, required: true },
  date: { type: Date, required: true },
  cleaningOption: {
    type: String,
    required: true,
    enum: [
      "Basic städning",
      "Topp städning",
      "Diamant städning",
      "Fönstertvätt",
    ],
  },
  message: String,
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customers",
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cleaners",
  },
  status: {
    type: String,
    enum: ["Bokad", "Avbokad", "Bekräftad", "Genomförd"],
    default: "Bokad",
  },
});

const BookingsModel = mongoose.model("Bookings", bookingSchema);

module.exports = BookingsModel;
