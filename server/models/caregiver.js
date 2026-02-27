const mongoose = require("mongoose");

const caregiverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    serviceType: {
        type: String,
        required: false
    },
    qualification: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    photo: {
        type: String
    },
    availability: {
        type: Boolean,
        default: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: "caregiver"
    }
}, { timestamps: true });

module.exports =
    mongoose.models.Caregiver ||
    mongoose.model("Caregiver", caregiverSchema);