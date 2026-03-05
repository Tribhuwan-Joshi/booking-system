const bookingService = require("../services/bookingService");

async function checkAvailability(req, res) {
    const { roomId, startDate, endDate } = req.body;

    if (!roomId || !startDate || !endDate) {
        return res.status(400).json({
            error: "roomId, startDate and endDate are required"
        });
    }

    try {
        const available = await bookingService.checkAvailability(
            roomId,
            startDate,
            endDate
        );

        res.json({ available });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function createBooking(req, res) {
    const { roomId, startDate, endDate } = req.body;

    if (!roomId || !startDate || !endDate) {
        return res.status(400).json({
            error: "roomId, startDate and endDate are required"
        });
    }

    try {
        const bookingId = await bookingService.createBooking(
            req.userId,
            roomId,
            startDate,
            endDate
        );

        res.status(201).json({
            message: "Booking confirmed",
            bookingId
        });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = {
    checkAvailability,
    createBooking
};