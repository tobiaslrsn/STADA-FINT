require("dotenv").config();
require("./mongoose");

const express = require("express");
const exphbs = require("express-handlebars");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

// ROUTES
const adminRoute = require("./routes/admin-route.js");
const loginRoutes = require("./routes/login-route.js");
const accountRoutes = require("./routes/accounts");
const bookingRoutes = require("./routes/bookings");

// !ROUTES

// MODELS
const AdminModels = require("./models/AdminModels.js");
const BookingModels = require("./models/BookingsModel.js");
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

app.use(async (req, res, next) => {
  const { customerToken } = req.cookies;

  if (customerToken && jwt.verify(customerToken, process.env.JWT_CUSTOMER)) {
    const customerData = jwt.decode(customerToken, process.env.JWT_CUSTOMER);
    res.locals.customerLoggedIn = true;
    res.locals.customerId = customerData.customerId;
    res.locals.firstName = customerData.firstName;
  } else {
    res.locals.customerLoggedIn = false;
  }
  next();
});

app.use(async (req, res, next) => {
  const { cleanerToken } = req.cookies;

  if (cleanerToken && jwt.verify(cleanerToken, process.env.JWT_CLEANER)) {
    const cleanerData = jwt.decode(cleanerToken, process.env.JWT_CLEANER);
    res.locals.cleanerLoggedIn = true;
    res.locals.cleanerId = cleanerData.cleanerId;
    res.locals.firstName = cleanerData.firstName;
  } else {
    res.locals.cleanerLoggedIn = false;
  }
  next();
});

app.get("/", async (req, res) => {
  res.render("home");
});

app.use("/admin", adminRoute);
app.use(loginRoutes);
app.use(accountRoutes);
app.use(bookingRoutes);

app.listen(8000, () => {
  console.log("/// RUNNING ON: http://localhost:8000");
});
