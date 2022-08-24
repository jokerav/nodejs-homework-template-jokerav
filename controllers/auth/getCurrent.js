const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { User } = require("../../models/user");
const getCurrent = async (req, res) => {
  const { authorization = "" } = req.headers;
  const [, token] = authorization.split(" ");

  const { id } = jwt.verify(token, SECRET_KEY);
  const { email, subscription } = await User.findById(id);

  res.json({ email, subscription });
};

module.exports = getCurrent;
