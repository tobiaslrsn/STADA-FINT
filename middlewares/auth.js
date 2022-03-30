const jwt = require("jsonwebtoken");

const forceAuthorize = (req, res, next) => {
  const { customerToken } = req.cookies;

  if (customerToken && jwt.verify(customerToken, process.env.JWT_CUSTOMER)) {
    next();
  } else {
    res.redirect("/");
  }
};

module.exports = { forceAuthorize };
