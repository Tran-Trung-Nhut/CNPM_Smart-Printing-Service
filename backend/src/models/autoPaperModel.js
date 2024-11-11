const { connectDB } = require("../config/config.js");

let pool;

async function initDB() {
    pool = await connectDB();
}

initDB();

const autoPaperModel = {
    getAllAutoPapers: async () => {
        try {
            const [rows] = await pool.query("SELECT * FROM AutoPaper");
            return rows;
        } catch (error) {
            console.error("Error in getAllAutoPapers:", error);
            throw error;
        }
    },

    createAutoPapers: async (semester, number, scheduler, spso_ID) => {
        try {
            const sql = "INSERT INTO AutoPaper (semester, number, scheduler, spso_ID) VALUES (?, ?, ?, ?)";
            await pool.query(sql, [semester, number, scheduler, spso_ID]);
        } catch (error) {
            console.error("Error in createAutoPaper:", error);
            throw error;
        }
    },
    updateAutoPaper: async (semester, number, scheduler) => {
        try {
            const sql = "UPDATE AutoPaper SET number = ?, scheduler = ? WHERE semester = ?";
            await pool.query(sql, [number, scheduler, semester]);
        } catch (error) {
            console.error("Error in updateAutoPaper:", error);
            throw error;
        }
    },

    getStudentPageBalance: async (user_ID) => {
        try {
            const [rows] = await pool.query("SELECT pageBalance FROM User WHERE user_ID = ?", [user_ID]);
            return rows[0]?.pageBalance || 0;
        } catch (error) {
            console.error("Error in getStudentPageBalance:", error);
            throw error;
        }
    },

    updateStudentPageBalance: async (user_ID, additionalPages) => {
        try {
            const sql = "UPDATE User SET pageBalance = pageBalance + ? WHERE user_ID = ?";
            await pool.query(sql, [additionalPages, user_ID]);
        } catch (error) {
            console.error("Error in updateStudentPageBalance:", error);
            throw error;
        }
    }
};

module.exports = autoPaperModel;
