require("dotenv").config();
require("./mongoose");

const express = require("express");
const exphbs = require("express-handlebars");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

// ROUTES
const adminRoute = require("./routes/admin-route.js");
const customerRoutes = require("./routes/customer");
const cleanerRoutes = require("./routes/cleaner");
const loginRoutes = require("./routes/login-route.js");

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

app.use(async (req, res, next) => {
  const { token } = req.cookies;

  if (token && jwt.verify(token, process.env.JWTSECRET)) {
    const tokenData = jwt.decode(token, process.env.JWTSECRET);
    res.locals.loggedIn = true;
    res.locals.userId = tokenData.userId;
    res.locals.firstName = tokenData.firstName;
  } else {
    res.locals.loggedIn = false;
  }
  next();
});

app.get("/", async (req, res) => {
  res.render("home");
});

app.use("/admin", adminRoute);
app.use(customerRoutes);
app.use(cleanerRoutes);
app.use(loginRoutes);

app.listen(8000, () => {
  console.log("/// RUNNING ON: http://localhost:8000");
});
