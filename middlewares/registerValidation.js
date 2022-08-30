const { basedir } = global;
const { createError } = require(`${basedir}/helpers`);
const { schemas } = require(`${basedir}/models/user`);

const registerValidation = async (req, _, next) => {
  try {
    await schemas.login.validate(req.body);
    next();
  } catch (error) {
    throw createError(400, error.message);
  }
};
module.exports = registerValidation;
