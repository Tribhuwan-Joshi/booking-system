const db = require("../config/db");

async function createUser(name, email, password) {
    const [result] = await db.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, password]
    );
    return result.insertId;
}

async function findUserByEmail(email) {
    const [rows] = await db.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );
    return rows[0];
}

module.exports = {
    createUser,
    findUserByEmail
};