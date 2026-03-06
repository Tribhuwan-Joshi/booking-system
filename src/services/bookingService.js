const db = require("../config/db");
const AppError = require("../utils/AppError");

async function checkAvailability(roomId, startDate, endDate) {
    const [rows] = await db.query(
        `SELECT id
     FROM bookings
     WHERE room_id = ?
     AND start_date <= ?
     AND end_date >= ?`,
        [roomId, endDate, startDate]
    );

    return rows.length === 0;
}

async function createBooking(userId, roomId, startDate, endDate) {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        const [overlap] = await connection.query(
            `SELECT id
       FROM bookings
       WHERE room_id = ?
       AND start_date <= ?
       AND end_date >= ?
       FOR UPDATE`,
            [roomId, endDate, startDate]
        );

        if (overlap.length > 0) {
            throw new AppError("Room already booked for selected dates", 400);
        }

        const [result] = await connection.query(
            `INSERT INTO bookings (user_id, room_id, start_date, end_date)
       VALUES (?, ?, ?, ?)`,
            [userId, roomId, startDate, endDate]
        );

        await connection.commit();

        return result.insertId;

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