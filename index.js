require("dotenv").config();
require("./mongoose");

const express = require("express");
const exphbs = require("express-handlebars");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

// ROUTES
const service = require("./routes/service.js");
const adminRoute = require("./routes/admin-route.js");
const loginRoutes = require("./routes/login-route.js");
const accountRoutes = require("./routes/accounts");
const bookingRoutes = require("./routes/bookings");
const cleanerSchedule = require("./routes/cleaner-schedule");

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

//admin jwt token
app.use(async (req, res, next) => {
  const { adminToken } = req.cookies;

  if (adminToken && jwt.verify(adminToken, process.env.JWT_ADMIN)) {
    const adminData = jwt.decode(adminToken, process.env.JWT_ADMIN);
    res.locals.adminLoggedIn = true;
    res.locals.adminId = adminData.adminId;
    res.locals.adminUsername = adminData.adminUsername;
  } else {
    res.locals.adminLoggedIn = false;
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
app.use(cleanerSchedule);
app.use(service);

app.listen(8080, () => {
  console.log("/// RUNNING ON: http://localhost:8080");
});
