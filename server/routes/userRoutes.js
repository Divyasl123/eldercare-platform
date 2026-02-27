const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");

// ================= REGISTER =================
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: "user"
        });

        await newUser.save();

        res.status(201).json({ message: "Registered successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


// ================= FORGOT PASSWORD =================
router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Email not registered" });
        }

        // Demo reset password (temporary password)
        const tempPassword = "123456";

        const hashedPassword = await bcrypt.hash(tempPassword, 10);
        user.password = hashedPassword;

        await user.save();

        res.json({
            message: "Password reset successful. Your new password is 123456"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;