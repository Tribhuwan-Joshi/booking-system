const express = require("express");
const controller = require("../controllers/bookingController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/check", authMiddleware, controller.checkAvailability);
router.post("/", authMiddleware, controller.createBooking);

module.exports = router;