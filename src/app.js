require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const roomRoutes = require("./routes/roomRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware.js");
const rateLimit = require("express-rate-limit")
const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false
});;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimiter);

// testing keliye
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});
app.use("/auth", authRoutes);
app.use("/rooms", roomRoutes);
app.use("/bookings", bookingRoutes);

app.use(errorMiddleware);


module.exports = app;