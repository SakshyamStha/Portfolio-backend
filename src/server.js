const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const { default: dbconnection } = require('./database/dbConn');
require('dotenv').config();
const cloudinary= require('cloudinary');

const app = express();

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL] ,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

dbconnection();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})



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

// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));