const crypto = require("crypto");
const bcrypt = require("bcrypt");

// Hashes the password

const getHashedPassword = (hashedPassword) => {
  const sha256 = crypto.createHash("sha256");
  const hash = sha256.update(hashedPassword).digest("base64");
  return hash;
};

const hashedPassword = (password) => {
  const hashValue = bcrypt.hashSync(password, 12);
  return hashValue;
};

const comparePassword = (password, hash) => {
  const correct = bcrypt.compareSync(password, hash);
  return correct;
};

function validateUsername(username) {
  let valid = true;
  valid = valid && username.length > 3;
  return valid;
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

// EMAIL VALIDATION

function validateEmailAddress(input) {
  // https://stackoverflow.com/a/59264110
  var regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
  if (regex.test(input)) {
    return 1;
  } else {
    return -1;
  }
}

module.exports = {
  getHashedPassword,
  hashedPassword,
  comparePassword,
  validateUsername,
  validateRegistration,
  validateEmailAddress,
};
