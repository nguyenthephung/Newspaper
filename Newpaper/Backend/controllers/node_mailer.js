const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ntphung21@vp.fitus.edu.vn',
    pass: '20030516'
  }
});

const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: 'ntphung21@vp.fitus.edu.vn',
      to,
      subject,
      text
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
