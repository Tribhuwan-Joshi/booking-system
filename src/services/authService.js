const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const { generateToken } = require("../utils/jwt");

async function register(name, email, password) {
    const existing = await userModel.findUserByEmail(email);
    if (existing) throw new Error("Email already registered");

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
    if (!user) throw new Error("Invalid credentials");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    const token = generateToken(user.id);

    return { userId: user.id, token };
}

module.exports = {
    register,
    login
};