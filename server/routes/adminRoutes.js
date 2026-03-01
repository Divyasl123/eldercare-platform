const express = require("express");
const router = express.Router();

// ✅ IMPORTANT: Match exact file names (case sensitive)
const User = require("../models/user");
const Patient = require("../models/patient");
const Booking = require("../models/booking");
const Caregiver = require("../models/caregiver");


// =====================================
// ✅ ADMIN STATS ROUTE
// =====================================
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
    console.error("Admin Stats Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


// =====================================
// ✅ EXPORT ROUTER
// =====================================
module.exports = router;