const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const getCurrent = require("./getCurrent");
const updateAvatar = require("./updateAvatar");
const validateEmail = require("./validateEmail");
const repeatValidateEmail = require("./repeatValidateEmail");
module.exports = {
  register,
  login,
  logout,
  getCurrent,
  updateAvatar,
  validateEmail,
  repeatValidateEmail,
};
