require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* ==============================
   MIDDLEWARE
============================== */

app.use(cors());
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
.then(() => {
    console.log("✅ MongoDB Connected Successfully");
})
.catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1);
});

/* ==============================
   IMPORT ROUTES
============================== */

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/patients", require("./routes/PatientRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/caregivers", require("./routes/caregiverRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

/* ==============================
   HEALTH CHECK ROUTE
============================== */

app.get("/", (req, res) => {
    res.status(200).json({
        message: "🚀 ElderCare+ Server Running Successfully"
    });
});

/* ==============================
   ERROR HANDLER
============================== */

app.use((err, req, res, next) => {
    console.error("🔥 Server Error:", err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

/* ==============================
   START SERVER (IMPORTANT FOR RENDER)
============================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});