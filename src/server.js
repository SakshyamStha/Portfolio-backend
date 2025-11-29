const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Rate limiter
app.use(
  '/api/',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

// Database connect
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Basic route
app.get('/', (req, res) => {
  res.send('Portfolio API is running...');
});

// Start server
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
