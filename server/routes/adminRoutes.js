const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Patient = require("../models/Patient");
const Booking = require("../models/Booking");
const Caregiver = require("../models/caregiver");

router.get("/stats", async (req,res)=>{

    try{

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

    }catch(error){
        res.status(500).json({message:"Server Error"});
    }

});

module.exports = router;