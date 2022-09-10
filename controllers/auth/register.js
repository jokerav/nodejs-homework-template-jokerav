const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { basedir } = global;
const { User, schemas } = require(`${basedir}/models/user`);
const { createError, sendMail } = require(`${basedir}/helpers`);

const register = async (req, res) => {
  const { error } = schemas.register.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, `${email} is already exist`);
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const verificationToken = nanoid(8);

  const mail = {
    to: email,
    subject: "Подтвеждение email",
    html: `<a target="_blank" href='http://localhost:3000/users/${verificationToken}'>Нажмите чтобы подтвердить свой email</a>`,
  };
  await sendMail(mail);

  const result = await User.create({
    ...req.body,
    password: hashPassword,
    verificationToken,
    avatarURL,
  });

  res.status(201).json({
    user: {
      email,
      subscription: result.subscription,
    },
  });
};

module.exports = register;
