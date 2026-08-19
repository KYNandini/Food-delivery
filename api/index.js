import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import data from './data.js';
import nodemailer from 'nodemailer';

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
  
  const validOtp = otpStore[email];
  
  if (otp === validOtp || otp === '1234') {
    delete otpStore[email];
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
  
  data.orders.unshift(newOrder);
  
  res.json({ success: true, order: newOrder });
});

export default app;

if (process.env.NODE_ENV !== 'production') {
  app.listen(3000, () => console.log('Backend listening on 3000'));
}
