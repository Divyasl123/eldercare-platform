const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");

// =============================
// CREATE BOOKING
// =============================
router.post("/", async (req, res) => {
    try {
        const booking = new Booking({
            ...req.body,
            status: "Pending"
        });

        await booking.save();
        res.status(201).json(booking);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// =============================
// GET ALL BOOKINGS
// =============================
router.get("/", async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// =============================
// UPDATE STATUS (Confirm / Active / Completed / Cancelled)
// =============================
router.put("/:id", async (req, res) => {
    try {
        const updated = await Booking.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { returnDocument: "after" }   // fixed warning
        );

        if (!updated) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.json(updated);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// =============================
// DELETE BOOKING (Admin Only)
// =============================
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Booking.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.json({ message: "Booking deleted permanently" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;