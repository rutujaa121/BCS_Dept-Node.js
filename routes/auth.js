const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
export const authRoutes = router;


// Registration GET
router.get('/register', (req, res) => {
  res.render('registration', { error: null, success: null });
});

router.post('/register', async (req, res) => {
  const { fullname, email, password, confirmPassword } = req.body;
  if (!fullname || !email || !password || !confirmPassword) {
    return res.render('registration', { error: 'Please fill in all fields.', success: null });
  }
  if (password !== confirmPassword) {
    return res.render('registration', { error: 'Passwords do not match.', success: null });
  }
  try {
    const rows = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.render('registration', { error: 'Email is already taken.', success: null });
    }
    const hashed = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)', [fullname, email, hashed]);
    return res.render('registration', { error: null, success: 'Registration successful! Please login.' });
  } catch (err) {
    console.error(err);
    return res.render('registration', { error: 'Something went wrong during registration. Please try again.', success: null });
  }
});

// Login GET
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.render('login', { error: 'Please enter both email and password.' });
  }
  try {
    const rows = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.render('login', { error: 'Email or password is incorrect.' });
    }
    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.render('login', { error: 'Email or password is incorrect.' });
    }
    // set session
    req.session.userId = user.id;
    req.session.userEmail = user.email;
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.render('login', { error: 'Something went wrong during login. Please try again.' });
  }
});

// Forgot Password GET
router.get('/forgot', (req, res) => {
  res.render('forgot', { error: null, message: null });
});

router.post('/forgot', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.render('forgot', { error: 'Please enter your email address.', message: null });
  }
  try {
    const rows = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      // Even if no user, send the same generic message
      return res.render('forgot', { message: 'If an account with that email exists, a reset link will be sent.', error: null });
    }
    const user = rows[0];
    const token = crypto.randomBytes(20).toString('hex');
    const expire = new Date(Date.now() + 3600000); // 1 hour

    await db.query('UPDATE users SET resetToken = ?, resetTokenExpiry = ? WHERE id = ?', [token, expire, user.id]);

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const resetURL = `http://localhost:4000/reset/${token}`;
    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset Link',
      text: `Click this link to reset your password: ${resetURL}`
    };

    await transporter.sendMail(mailOptions);
    return res.render('forgot', { message: 'Reset link sent to your email.', error: null });
  } catch (err) {
    console.error(err);
    return res.render('forgot', { error: 'Error sending reset link. Please try again later.', message: null });
  }
});

// Reset Password GET
router.get('/reset/:token', async (req, res) => {
  const token = req.params.token;
  try {
    const rows = await db.query('SELECT * FROM users WHERE resetToken = ? AND resetTokenExpiry > ?', [token, new Date()]);
    if (rows.length === 0) {
      return res.send('Password reset link is invalid or has expired.');
    }
    return res.render('reset', { token: token, error: null });
  } catch (err) {
    console.error(err);
    return res.send('Something went wrong.');
  }
});

router.post('/reset/:token', async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;
  if (!password || !confirmPassword) {
    return res.render('reset', { token: token, error: 'Please fill in all fields.' });
  }
  if (password !== confirmPassword) {
    return res.render('reset', { token: token, error: 'Passwords do not match.' });
  }
  try {
    const rows = await db.query('SELECT * FROM users WHERE resetToken = ? AND resetTokenExpiry > ?', [token, new Date()]);
    if (rows.length === 0) {
      return res.send('Password reset link is invalid or has expired.');
    }
    const hashed = await bcrypt.hash(password, 10);
    await db.query('UPDATE users SET password = ?, resetToken = NULL, resetTokenExpiry = NULL WHERE id = ?', [hashed, rows[0].id]);
    return res.redirect('/login');
  } catch (err) {
    console.error(err);
    return res.send('Something went wrong.');
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) console.error(err);
    res.redirect('/login');
  });
});

module.exports = router;
export default router;