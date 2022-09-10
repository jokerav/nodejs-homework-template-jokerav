const { basedir } = global;
const { User, schemas } = require(`${basedir}/models/user`);
const { createError, sendMail } = require(`${basedir}/helpers`);

const repeatValidateEmail = async (req, res, next) => {
  try {
    const { error } = schemas.email.validate(req.body);
    if (error) {
      throw createError(400, "missing required field email");
    }
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user.verify) {
      throw createError(400, "Verification has already been passed");
    }
    const mail = {
      to: email,
      subject: "Подтвеждение email",
      html: `<a target="_blank" href='http://localhost:3000/users/${user.verificationToken}'>Нажмите чтобы подтвердить свой email</a>`,
    };
    sendMail(mail);
    res.json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = repeatValidateEmail;
