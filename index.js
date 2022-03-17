require("dotenv").config();
require("./mongoose.js");

const express = require("express");
const exphbs = require("express-handlebars");
const jwt = require("jsonwebtoken");
const cookieParser = "cookie-parser";

// ROUTES
const adminRoute = require("./routes/admin-route.js");
// !ROUTES

// MODELS
const AdminModels = require("./models/AdminModels.js");
const BookingModels = require("./models/BookingModels.js");
const CleanerModels = require("./models/CleanerModels.js");
const CustomersModels = require("./models/CustomersModels.js");
// !MODELS

const app = express();

app.use(express.urlencoded({ extended: true }));

app.engine(
  "hbs",
  exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main",
  })
);

app.set("view engine", "hbs");
app.use(express.static("public"));
// app.use(cookieParser());

app.use("/admin", adminRoute);

app.get("/", async (req, res) => {
  res.render("home");
});

app.listen(8000, () => {
  console.log("/// RUNNING ON: http://localhost:8000");
});
