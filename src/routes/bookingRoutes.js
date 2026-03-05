const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const controller = require("../controllers/bookingController");

const router = express.Router();

router.get("/rooms", controller.getRooms);

router.post("/check", authMiddleware, controller.checkAvailability);

router.post("/", authMiddleware, controller.createBooking);

module.exports = router;