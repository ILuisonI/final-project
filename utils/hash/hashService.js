const config = require("config");
const bcryptjs = require("./bcrypt");

const hashOption = config.get("hashOption");

const generateHash = (password) => {
  if (hashOption === "bcryptjs") {
    return bcryptjs.generateHash(password);
  }
};

const cmpHash = (password, hash) => {
  if (hashOption === "bcryptjs") {
    return bcryptjs.cmpHash(password, hash);
  }
};

module.exports = {
  generateHash,
  cmpHash,
};