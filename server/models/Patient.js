const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Patient name is required"],
      trim: true,
    },

    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [0, "Age cannot be negative"],
    },

    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["Male", "Female", "Other"],
    },

    condition: {
      type: String,
      trim: true,
      default: "Not specified",
    },

    service: {
      type: String,
      required: [true, "Service type is required"],
      trim: true,
    },

    contact: {
      type: String,
      required: [true, "Contact number is required"],
      trim: true,
      match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"],
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite error in development
module.exports =
  mongoose.models.Patient || mongoose.model("Patient", patientSchema);