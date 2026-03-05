const bookingService = require("../services/bookingService");
const AppError = require("../utils/AppError");

async function checkAvailability(req, res, next) {
    const { roomId, startDate, endDate } = req.body;

    if (!roomId || !startDate || !endDate) {
        return next(new AppError("roomId, startDate and endDate are required", 400));
    }

    try {
        const available = await bookingService.checkAvailability(
            roomId,
            startDate,
            endDate
        );

        res.json({ available });
    } catch (err) {
        next(err);
    }
}

async function createBooking(req, res, next) {
    const { roomId, startDate, endDate } = req.body;

    if (!roomId || !startDate || !endDate) {
        return next(new AppError("roomId, startDate and endDate are required", 400));
    }

    if (new Date(startDate) > new Date(endDate)) {
        return next(new AppError("Invalid date range", 400));
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
        next(err);
    }
}

module.exports = {
    checkAvailability,
    createBooking
};