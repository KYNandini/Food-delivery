require('dotenv').config();
const express = require('express');
const cors = require('cors');
const data = require('./data');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory temp storage for OTPs
const otpStore = {};

let transporter;
async function initMailer() {
  if (process.env.SMTP_USER && process.env.SMTP_USER !== 'your-email@gmail.com') {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    console.log('Nodemailer initialized with Gmail (from .env)');
  } else {
    let testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    console.log('Nodemailer initialized with Ethereal test account');
  }
}
initMailer();

// Auth Routes
app.post('/api/auth/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });
  
  // Generate random 4 digit OTP for demo
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  otpStore[email] = otp;
  
  if (!transporter) {
    return res.status(500).json({ error: 'Mail server not initialized yet' });
  }

  try {
    let info = await transporter.sendMail({
      from: '"Food Delivery App" <no-reply@fooddelivery.com>',
      to: email,
      subject: "Your Login OTP",
      text: `Your OTP for login is: ${otp}`,
      html: `<h2>Welcome to Food Delivery!</h2><p>Your OTP for login is: <b>${otp}</b></p>`,
    });

    console.log(`[Email] OTP ${otp} sent to ${email}`);
    const testUrl = nodemailer.getTestMessageUrl(info);
    if(testUrl) {
      console.log(`[Email Preview] View Email: ${testUrl}`);
    }
    
    res.json({ success: true, message: 'OTP Sent successfully' });
  } catch(err) {
    console.error("Error sending email", err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.post('/api/auth/verify-otp', (req, res) => {
  const { email, otp, name } = req.body;
  
  // For demo purposes, we will accept any 4-digit code if the strict check fails, 
  // or we can strictly enforce it to prove it works. Let's strictly enforce it but log it clearly.
  const validOtp = otpStore[email];
  
  // But wait, the user's prompt explicitly allows entering 'any 4 digits' as a fallback if they don't look at the console.
  // We'll accept if it matches, OR if it's '1234' for demo ease.
  if (otp === validOtp || otp === '1234') {
    delete otpStore[email];
    // Create/return user object
    res.json({ success: true, user: { name, email } });
  } else {
    res.status(401).json({ error: 'Invalid OTP' });
  }
});

// Restaurant Routes
app.get('/api/restaurants', (req, res) => {
  res.json(data.restaurants);
});

app.get('/api/categories', (req, res) => {
  res.json(data.categories);
});

// Order Routes
app.get('/api/orders', (req, res) => {
  res.json(data.orders);
});

app.post('/api/orders', (req, res) => {
  const { restaurantId, items, total, status, date } = req.body;
  
  const newOrder = {
    id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    restaurantId,
    items,
    total,
    status: status || 'preparing',
    date: date || 'Just now'
  };
  
  // Add to in-memory array (front of list)
  data.orders.unshift(newOrder);
  
  res.json({ success: true, order: newOrder });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend API Server running at http://localhost:${PORT}`);
  console.log('Endpoints ready:');
  console.log(' - POST /api/auth/send-otp');
  console.log(' - POST /api/auth/verify-otp');
  console.log(' - GET  /api/restaurants');
  console.log(' - GET  /api/categories');
  console.log(' - GET  /api/orders');
  console.log(' - POST /api/orders');
});
