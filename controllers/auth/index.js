const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const getCurrent = require("./getCurrent");
const updateAvatar = require("./updateAvatar");
const repeatValidateEmail = require("./repeatValidateEmail");
const validateEmail = require("./validateEmail");

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  updateAvatar,
  validateEmail,
  repeatValidateEmail,
};
