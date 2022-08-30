const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { basedir } = global;
const { User } = require(`${basedir}/models/user`);
const { createError } = require(`${basedir}/helpers`);

const logout = async (req, res) => {
  const { authorization = "" } = req.headers;
  const [, token] = authorization.split(" ");
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    await User.findByIdAndUpdate(id, { token: "" });
    res.status(204).send();
  } catch (error) {
    createError(401, error.message);
  }
};

module.exports = logout;
