const authService = require("../services/authService");
const AppError = require("../utils/AppError");

async function register(req, res, next) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return next(new AppError("name, email and password are required", 400));
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return next(new AppError("Invalid email format", 400));
    }

    if (password.length < 6) {
        return next(new AppError("Password must be at least 6 characters long", 400));
    }

    try {
        const result = await authService.register(name, email, password);
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
}

async function login(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError("email and password are required", 400));
    }

    try {
        const result = await authService.login(email, password);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    register,
    login
};