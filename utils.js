const crypto = require("crypto");

// Hashes the password

function getHashedPassword(password) {
  const sha256 = crypto.createHash("sha256");
  const hash = sha256.update(password).digest("base64");
  return hash;
}

// Registration validation

function validateRegistration(account) {
  let valid = true;

  valid = valid && account.email;
  valid = valid && account.email.length > 0;
  valid = valid && account.firstName;
  valid = valid && account.firstName.length > 0;
  valid = valid && account.lastName;
  valid = valid && account.lastName.length > 0;
  valid = valid && account.streetName;
  valid = valid && account.streetName.length > 0;
  valid = valid && account.postalCode;
  valid = valid && account.postalCode.length > 0;
  valid = valid && account.city;
  valid = valid && account.city.length > 0;

  return valid;
}

module.exports = { getHashedPassword, validateRegistration };
