const roomService = require("../services/roomService");

async function getRooms(req, res) {
    try {
        const rooms = await roomService.getRooms();
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch rooms" });
    }
}

module.exports = { getRooms };