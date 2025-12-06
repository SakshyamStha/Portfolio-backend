import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";
import dbconnection from "./database/dbConn.js";

dotenv.config();

// Connect database
dbconnection();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
