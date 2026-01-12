import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import diagnosticsRoutes from "./routes/diagnostics.js";
import cropRecommendationRoutes from "./routes/cropRecommendation.js";
import marketPricesRoutes from "./routes/marketPrices.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/diagnostics", diagnosticsRoutes);
app.use("/api/crop-recommendation", cropRecommendationRoutes);
app.use("/api/market-prices", marketPricesRoutes);

// Start server first
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Connect to MongoDB with better error handling
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    console.log("Server will continue running without database connection");
  });
