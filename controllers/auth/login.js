const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { basedir } = global;
const { User } = require(`${basedir}/models/user`);
const { createError } = require(`${basedir}/helpers`);
require("dotenv").config();
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user.verify) {
    throw createError(401, "Email not verify");
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!user || !comparePassword) {
    throw createError(401, "Login error. Email or password is not correct");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
    token,
  });
};
module.exports = login;
