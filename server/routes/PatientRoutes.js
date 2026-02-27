const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");

/* ================= CREATE PATIENT ================= */

router.post("/", async (req, res) => {

    try {

        console.log("Incoming Data:", req.body);

        const { name, age, gender, condition, service, contact } = req.body;

        if (!name || !age || !gender || !service || !contact) {
            return res.status(400).json({ message: "All required fields must be filled" });
        }

        const newPatient = new Patient({
            name,
            age,
            gender,
            condition,
            service,
            contact
        });

        await newPatient.save();

        res.status(201).json({
            message: "Patient created successfully",
            patient: newPatient
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }

});

// ===============================
// GET ALL PATIENTS
// ===============================
router.get("/", async (req, res) => {
    try {
        const patients = await Patient.find().sort({ createdAt: -1 });
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: "Error fetching patients" });
    }
});

// DELETE PATIENT
router.delete("/:id", async (req, res) => {
    try {
        await Patient.findByIdAndDelete(req.params.id);
        res.json({ message: "Patient deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting patient" });
    }
});

module.exports = router;