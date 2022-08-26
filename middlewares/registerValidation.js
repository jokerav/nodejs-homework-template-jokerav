const { createError } = require("../helpers");
const { schemas } = require("../models/user");

const registerValidation = async (req, _, next) => {
  try {
    await schemas.login.validate(req.body);
    next();
  } catch (error) {
    throw createError(400, error.message);
  }
};
module.exports = registerValidation;
