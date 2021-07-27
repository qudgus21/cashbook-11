const bcrypt = require("bcrypt");

const SALT_ROUNDS = 12;

const createHash = (password) => {
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

const verifyPassword = ({ password, hash }) => {
  const isEqualPassword = bcrypt.compareSync(password, hash);

  return isEqualPassword;
};

module.exports = { createHash, verifyPassword };