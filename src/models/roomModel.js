const db = require("../config/db");

async function getAllRooms() {
    const [rows] = await db.query(
        "SELECT id, name, price_per_night FROM rooms"
    );
    return rows;
}

module.exports = { getAllRooms };