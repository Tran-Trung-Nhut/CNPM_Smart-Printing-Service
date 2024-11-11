const { connectDB } = require("../config/config.js");

let pool;

async function initDB() {
    pool = await connectDB();
}

initDB();

const fileTypeModel = {
    getAllFileTypes: async () => {
        try {
            const [rows] = await pool.query("SELECT * FROM FileType");
            return rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    createFileType: async (type, spso_ID) => {
        try {
            const sql = "INSERT INTO FileType (type, spso_ID) VALUES (?, ?)";
            await pool.query(sql, [type, spso_ID]);
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    deleteFileType: async (type) => {
        try {
            const sql = "DELETE FROM FileType WHERE type = ?";
            await pool.query(sql, [type]);
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    isFileTypeValid: async (type) => {
        try {
            const [rows] = await pool.query("SELECT * FROM FileType WHERE type = ?", [type]);
            return rows.length > 0;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    
};

module.exports = fileTypeModel;
