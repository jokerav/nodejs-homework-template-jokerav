const sgMail = require("@sendgrid/mail");
const { createError } = require("./createError");
require("dotenv").config();

const { MAIL_API_KEY } = process.env;

sgMail.setApiKey(MAIL_API_KEY);

const sendMail = async (data) => {
  try {
    const mail = { ...data, from: "jokeravdeveloper@ukr.net" };
    await sgMail.send(mail);
    return true;
  } catch (error) {
    throw createError(404);
  }
};

module.exports = sendMail;
