const express = require("express");
const router = express.Router();
const Caregiver = require("../models/caregiver");

// ======================================
// GET VERIFIED & AVAILABLE CAREGIVERS (For User Panel)
// ======================================
router.get("/", async (req, res) => {
    try {
        const caregivers = await Caregiver.find({
            verified: true,
            availability: true
        });

        res.json(caregivers);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ======================================
// GET ALL CAREGIVERS (For Admin Panel)
// ======================================
router.get("/all", async (req, res) => {
    try {
        const caregivers = await Caregiver.find();
        res.json(caregivers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ======================================
// ADD NEW CAREGIVER
// ======================================
router.post("/", async (req, res) => {
    try {
        const { name, qualification, experience, photo } = req.body;

        if (!name || !qualification || !experience) {
            return res.status(400).json({
                message: "Please fill all required fields"
            });
        }

        const caregiver = new Caregiver({
            name,
            qualification,
            experience,
            photo,
            email: name.replace(/\s+/g, "").toLowerCase() + "@care.com",
            password: "123456",
            serviceType: "General Care",
            availability: true,
            verified: true
        });

        const saved = await caregiver.save();
        res.status(201).json(saved);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ======================================
// UPDATE CAREGIVER
// ======================================
router.put("/:id", async (req, res) => {
    try {
        const updated = await Caregiver.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updated);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ======================================
// DELETE CAREGIVER
// ======================================
router.delete("/:id", async (req, res) => {
    try {
        await Caregiver.findByIdAndDelete(req.params.id);
        res.json({ message: "Caregiver deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ======================================
// TOGGLE AVAILABILITY
// ======================================
router.put("/availability/:id", async (req, res) => {
    try {
        const caregiver = await Caregiver.findById(req.params.id);

        caregiver.availability = !caregiver.availability;
        await caregiver.save();

        res.json(caregiver);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;