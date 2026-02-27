require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* ==============================
   MIDDLEWARE
============================== */

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ==============================
   MONGODB CONNECTION
============================== */

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI not found in environment variables");
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1);
  });

/* ==============================
   IMPORT ROUTES
============================== */

const userRoutes = require("./routes/userRoutes");
const patientRoutes = require("./routes/patientRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const caregiverRoutes = require("./routes/caregiverRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const adminRoutes = require("./routes/adminRoutes");

/* ==============================
   USE ROUTES
============================== */

app.use("/api/users", userRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/caregivers", caregiverRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/admin", adminRoutes);

/* ==============================
   ROOT ROUTE
============================== */

app.get("/", (req, res) => {
  res.status(200).json({
    message: "🚀 ElderCare Platform Backend Running Successfully"
  });
});

/* ==============================
   GLOBAL ERROR HANDLER
============================== */

app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});

/* ==============================
   START SERVER (RENDER SAFE)
============================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});