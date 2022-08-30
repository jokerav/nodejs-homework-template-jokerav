const { basedir } = global;
const { createError } = require(`${basedir}/helpers`);
const { schemas } = require(`${basedir}/models/user`);
const loginValidation = async (req, _, next) => {
  try {
    await schemas.login.validate(req.body);
  } catch (error) {
    throw createError(400, error.message);
  }

  next();
};
module.exports = loginValidation;
