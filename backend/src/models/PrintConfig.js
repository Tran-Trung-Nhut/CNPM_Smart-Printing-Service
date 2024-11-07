const { connectDB } = require("../config/config.js");

const PrintConfig = {
    findAll: async () => {
        try {
            const pool = await connectDB();
            const [rows] = await pool.query('SELECT * FROM PrintConfiguration');
            console.log(rows)
            return rows;
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = PrintConfig;
