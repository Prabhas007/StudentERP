const nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
const dotenv = require('dotenv');
dotenv.config();

{/*var smtpTransport = require('nodemailer-smtp-transport');

var transport = nodemailer.createTransport(smtpTransport({
    host: "smtp.gmail.com",
    service: 'gmail',
    auth: {
        user: '2100030406cseh@gmail.com', 
        pass: 'venkat999MS@'
    }
}));*/}
const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  service: 'gmail',
  secure: true,
  auth: {
    user: '2100030215cseh@gmail.com',
    pass: 'xckvgthrdjljrspy'
  }
});

const sendEmail = async (email, secretToken, mode) => {
  try {
    if (mode === "OTP") {
      return await transport.sendMail({
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: "College ERP OTP",
        html: `
        <h1>Reset Password</h1>
        <p> Here is your OTP to change the password ${secretToken} </p>
      `,
      });
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = sendEmail;
