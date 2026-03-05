const express = require("express");
const controller = require("../controllers/roomController");

const router = express.Router();

router.get("/", controller.getRooms);

module.exports = router;