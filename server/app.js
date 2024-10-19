require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());  // Allow CORS for React frontend
app.use(bodyParser.json());

const otpStore = {}; // Temporary store for OTPs (in-memory)

// Set up Nodemailer for email OTP
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Set up Twilio for phone OTP
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Helper function to generate a random 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP
}

// Send OTP via email
app.post('/send-email-otp', (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();

  otpStore[email] = { otp, expiresAt: Date.now() + 300000 }; // OTP valid for 5 minutes

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It will expire in 5 minutes.`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Error sending email OTP', error });
    }
    res.status(200).json({ message: 'Email OTP sent', otp });
  });
});

// Send OTP via SMS (phone)
app.post('/send-phone-otp', (req, res) => {
  const { phone } = req.body;
  const otp = generateOTP();
    console.log(otp)
  otpStore[phone] = { otp, expiresAt: Date.now() + 300000 }; // OTP valid for 5 minutes

  twilioClient.messages
    .create({
      body: ` im ANANDU Your OTP code is ${otp}. It will expire in 5 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    })
    .then(message => {
      res.status(200).json({ message: 'Phone OTP sent', otp });
    })
    .catch(error => {
      res.status(500).json({ message: 'Error sending phone OTP', error });
    });
});

// Verify OTP
app.post('/verify-otp', (req, res) => {
  const { emailOrPhone, otp } = req.body;

  if (!otpStore[emailOrPhone]) {
    return res.status(400).json({ message: 'OTP not found. Please request a new one.' });
  }

  const { otp: storedOtp, expiresAt } = otpStore[emailOrPhone];

  if (Date.now() > expiresAt) {
    return res.status(400).json({ message: 'OTP expired. Please request a new one.' });
  }

  if (storedOtp !== parseInt(otp)) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  delete otpStore[emailOrPhone];
  res.status(200).json({ message: 'OTP verified successfully' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
