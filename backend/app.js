// backend/app.js

import express from "express";
import { connect } from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json()); // Body parser middleware

// Routes
import routes from "./routes/routes.js";
app.use("/api/users", routes);

// Connect to MongoDB
connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process with failure
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

export default app;
