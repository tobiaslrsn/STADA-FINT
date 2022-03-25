const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  streetName: { type: String, required: true },
  postalCode: { type: String, required: true },
  city: { type: String, required: true },
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bookings" }],
});

const CustomersModel = mongoose.model("Customers", customerSchema);

module.exports = CustomersModel;
