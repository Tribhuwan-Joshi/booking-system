const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const { generateToken } = require("../utils/jwt");
const AppError = require("../utils/AppError");

async function register(name, email, password) {
    const existing = await userModel.findUserByEmail(email);

    if (existing) {
        throw new AppError("Email already registered", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await userModel.createUser(
        name,
        email,
        hashedPassword
    );

    const token = generateToken(userId);

    return { userId, token };
}

async function login(email, password) {
    const user = await userModel.findUserByEmail(email);

    if (!user) {
        throw new AppError("Invalid credentials", 401);
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
        throw new AppError("Invalid credentials", 401);
    }

    const token = generateToken(user.id);

    return { userId: user.id, token };
}

module.exports = {
    register,
    login
};