const express = require("express");
const router = express.Router();
const Service = require("../models/service");


// ================= GET ALL SERVICES =================
router.get("/", async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch services ❌"
        });
    }
});


// ================= GET SINGLE SERVICE =================
router.get("/:id", async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({
                message: "Service not found ❌"
            });
        }

        res.status(200).json(service);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching service ❌"
        });
    }
});


// ================= ADD NEW SERVICE =================
router.post("/", async (req, res) => {
    try {

        const { name, description, duration, price, qualification } = req.body;

        const service = new Service({
            name,
            description,
            duration,
            price,
            qualification
        });

        await service.save();

        res.status(201).json({
            message: "Service added successfully ✅",
            service
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to add service ❌"
        });
    }
});


// ================= UPDATE SERVICE =================
router.put("/:id", async (req, res) => {
    try {

        const updatedService = await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedService) {
            return res.status(404).json({
                message: "Service not found ❌"
            });
        }

        res.status(200).json({
            message: "Service updated successfully ✅",
            updatedService
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update service ❌"
        });
    }
});


// ================= DELETE SERVICE =================
router.delete("/:id", async (req, res) => {
    try {

        const deletedService = await Service.findByIdAndDelete(req.params.id);

        if (!deletedService) {
            return res.status(404).json({
                message: "Service not found ❌"
            });
        }

        res.status(200).json({
            message: "Service deleted successfully ✅"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete service ❌"
        });
    }
});

module.exports = router;
