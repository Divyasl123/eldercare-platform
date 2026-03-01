const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Patient = require("../models/patient");


// ======================================
// ✅ CREATE PATIENT
// ======================================
router.post("/", async (req, res) => {
  try {
    console.log("Incoming Data:", req.body);

    const { name, age, gender, condition, service, contact } = req.body;

    // Basic validation
    if (!name || !age || !gender || !service || !contact) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    const newPatient = new Patient({
      name,
      age,
      gender,
      condition,
      service,
      contact,
    });

    await newPatient.save();

    res.status(201).json({
      success: true,
      message: "Patient created successfully",
      data: newPatient,
    });

  } catch (error) {
    console.error("Create Patient Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});


// ======================================
// ✅ GET ALL PATIENTS
// ======================================
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: patients.length,
      data: patients,
    });

  } catch (error) {
    console.error("Fetch Patients Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching patients",
    });
  }
});


// ======================================
// ✅ GET SINGLE PATIENT BY ID
// ======================================
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Patient ID",
      });
    }

    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    res.json({
      success: true,
      data: patient,
    });

  } catch (error) {
    console.error("Get Patient Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});


// ======================================
// ✅ DELETE PATIENT
// ======================================
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Patient ID",
      });
    }

    const deletedPatient = await Patient.findByIdAndDelete(id);

    if (!deletedPatient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    res.json({
      success: true,
      message: "Patient deleted successfully",
    });

  } catch (error) {
    console.error("Delete Patient Error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting patient",
    });
  }
});


module.exports = router;