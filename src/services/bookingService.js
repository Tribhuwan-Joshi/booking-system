const db = require("../config/db");
const bookingModel = require("../models/bookingModel");

async function checkAvailability(roomId, startDate, endDate) {
    const connection = await db.getConnection();

    try {
        const rows = await bookingModel.findOverlap(
            connection,
            roomId,
            startDate,
            endDate
        );

        return rows.length === 0;
    } finally {
        connection.release();
    }
}

async function createBooking(userId, roomId, startDate, endDate) {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        const overlap = await bookingModel.findOverlap(
            connection,
            roomId,
            startDate,
            endDate
        );

        if (overlap.length > 0) {
            throw new Error("Room already booked for selected dates");
        }

        const bookingId = await bookingModel.createBooking(
            connection,
            userId,
            roomId,
            startDate,
            endDate
        );

        await connection.commit();

        return bookingId;

    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
}

module.exports = {
    checkAvailability,
    createBooking
};