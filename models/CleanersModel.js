const mongoose = require("mongoose");

const cleanerSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  streetName: { type: String, required: true },
  postalCode: { type: String, required: true },
  city: { type: String, required: true },
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bookings" }],
});

const CleanersModel = mongoose.model("Cleaners", cleanerSchema);

module.exports = CleanersModel;
