const db = require("../config/db");

async function findOverlap(connection, roomId, startDate, endDate) {
    const [rows] = await connection.query(
        `SELECT id FROM bookings
     WHERE room_id = ?
     AND start_date <= ?
     AND end_date >= ?`,
        [roomId, endDate, startDate]
    );
    return rows;
}

async function createBooking(connection, userId, roomId, startDate, endDate) {
    const [result] = await connection.query(
        `INSERT INTO bookings (user_id, room_id, start_date, end_date)
     VALUES (?, ?, ?, ?)`,
        [userId, roomId, startDate, endDate]
    );
    return result.insertId;
}

module.exports = {
    findOverlap,
    createBooking
};