/* eslint-disable no-unused-vars */
const nodemailer = require("nodemailer");

const mailOptions = {
  from: "lballanger.dev@gmail.com",
};

const sendingMail = async (params) => {
  const {
    sender,
    type,
    username,
    urlLink,
    revokeLink,
    subject,
    message,
    email,
  } = params;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "lballanger.dev@gmail.com",
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });
  mailOptions.to = sender;
  mailOptions.subject =
    type === "registred" ? "Bienvenue chez L'agréable Utile" : subject;
  // eslint-disable-next-line global-require
  mailOptions.html = require("../templates/registred");

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = sendingMail;
