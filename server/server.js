require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* ==============================
   MIDDLEWARE
============================== */

// Enable CORS for frontend
app.use(cors({
    origin: "*", // you can restrict later
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
}));

// Parse JSON properly (VERY IMPORTANT)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ==============================
   MONGODB CONNECTION
============================== */

const MONGO_URI = process.env.MONGO_URI || 
"mongodb://127.0.0.1:27017/eldercare";

mongoose.connect(MONGO_URI)
.then(() => {
    console.log("✅ MongoDB Connected Successfully");
})
.catch((err) => {
    console.log("❌ MongoDB Connection Failed:", err.message);
});

/* ==============================
   IMPORT ROUTES
============================== */

const userRoutes = require("./routes/userRoutes");
const patientRoutes = require("./routes/PatientRoutes");
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
   HEALTH CHECK ROUTE
============================== */

app.get("/", (req, res) => {
    res.status(200).json({
        message: "🚀 ElderCare+ Server Running Successfully"
    });
});

/* ==============================
   ERROR HANDLER (VERY IMPORTANT)
============================== */

app.use((err, req, res, next) => {
    console.error("🔥 Server Error:", err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

/* ==============================
   START SERVER
============================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});