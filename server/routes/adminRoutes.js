const express = require("express");
const router = express.Router();

// ✅ IMPORTANT: Match exact file names (case sensitive)
const User = require("../models/user");         // small u
const Patient = require("../models/patient");  // capital P (because file is Patient.js)
const Booking = require("../models/booking");  // small b
const Caregiver = require("../models/caregiver"); // small c

// =============================
// ADMIN STATS ROUTE
// =============================
router.get("/stats", async (req, res) => {
  try {
    const users = await User.countDocuments();
    const patients = await Patient.countDocuments();
    const bookings = await Booking.countDocuments();
    const caregivers = await Caregiver.countDocuments();

    res.json({
      users,
      patients,
      bookings,
      caregivers
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;