const { createError } = require("../helpers");
const { schemas } = require("../models/user");
const loginValidation = async (req, _, next) => {
  try {
    await schemas.login.validate(req.body);
  } catch (error) {
    throw createError(400, error.message);
  }

  next();
};
module.exports = loginValidation;
