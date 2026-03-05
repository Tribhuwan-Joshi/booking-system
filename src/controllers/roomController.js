const roomService = require("../services/roomService");

async function getRooms(req, res, next) {
    try {
        const rooms = await roomService.getRooms();
        res.json(rooms);
    } catch (err) {
        next(err);
    }
}

module.exports = { getRooms };