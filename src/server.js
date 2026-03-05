require("dotenv").config();

const app = require("./app");
const db = require("./config/db");

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await db.query("SELECT 1");

        console.log("Database connected");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (err) {
        console.error("Failed to connect to database", err);
        process.exit(1);
    }
}

startServer();