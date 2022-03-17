require("dotenv").config();
require("./mongoose");

const express = require("express");
const exphbs = require("express-handlebars");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

// ROUTES
const customerRoutes = require("./routes/customer");
// !ROUTES

// MODELS
const AdminModels = require("./models/AdminModels.js");
const BookingModels = require("./models/BookingModels.js");
const CleanerModels = require("./models/CleanersModel.js");
const CustomersModels = require("./models/CustomersModel.js");
// !MODELS

const app = express();

app.engine(
  "hbs",
  exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main",
  })
);

app.set("view engine", "hbs");
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", async (req, res) => {
  res.render("home");
});

app.use(customerRoutes);

app.listen(8000, () => {
  console.log("/// RUNNING ON: http://localhost:8000");
});
