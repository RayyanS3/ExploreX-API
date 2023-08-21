const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: 'Rayyan Suhail <rayyan.suhail2001@gmail.com>',
    email: options.email,
    subject: options.subject,
    message: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
