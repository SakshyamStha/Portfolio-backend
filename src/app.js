import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cloudinary from "cloudinary";
import dotenv from "dotenv";

import messageRouter from "./routes/messageRoutes.js";
import { errorMiddleware } from "./middleware/error.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(helmet());

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Rate limiter
app.use(
  "/api/",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

// Routes
app.use("/api/v1/message", messageRouter);

// Home route
app.get("/", (req, res) => {
  res.send("Portfolio API is running...");
});

// Error middleware
app.use(errorMiddleware);

export default app;
