const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    service: {
        type: String,
        required: true
    },
    caregiverName: {
        type: String,
        required: true
    },
    patientName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Confirmed"
    }
}, { timestamps: true });

module.exports = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);