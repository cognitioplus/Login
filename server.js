const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();

// Security Middleware
app.use(helmet());
app.use(express.json({ limit: '10mb' }));

// CORS: Allow your appimize.app domain
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://cognitio-plus.appimize.app',
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});
app.use(limiter);

// Connect DB
connectDB();

// Routes
app.use('/api/auth', authRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send(`
    <h1>Cognitio+ Backend ✅</h1>
    <p>Use <code>/api/auth/register</code> and <code>/api/auth/login</code></p>
  `);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
