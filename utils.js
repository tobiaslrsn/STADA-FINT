const crypto = require("crypto");

const getHashedPassword = (hashedPassword) => {
  const sha256 = crypto.createHash("sha256");
  const hash = sha256.update(hashedPassword).digest("base64");
  return hash;
};

const bcrypt = require("bcrypt");

const hashedPassword = (password) => {
  const hashValue = bcrypt.hashSync(password, 12);
  return hashValue;
};

module.exports = {
  getHashedPassword,
  hashedPassword,
};
