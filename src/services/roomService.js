const roomModel = require("../models/roomModel");

async function getRooms() {
    return await roomModel.getAllRooms();
}

module.exports = { getRooms };