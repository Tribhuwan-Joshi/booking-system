require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

app.use(helmet());
app.use(cors());

app.use(express.json());

// testing keliye
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});
app.use("/auth", authRoutes);
app.use("/bookings", bookingRoutes);
module.exports = app;