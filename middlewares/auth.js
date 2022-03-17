const jwt = require("jsonwebtoken");

const forceAuthorize = (req, res, next) => {
  const { token } = req.cookies;

  if (token && jwt.verify(token, process.env.JWTSECRET)) {
    next();
  } else {
    res.sendStatus(401); // Redirect till någon error.hbs
  }
};

mocule.exports = { forceAuthorize };
