const { connectDB } = require("../config/config.js");
const Query = require("../config/query");
let pool;

async function initDB() {
    pool = await connectDB();
}

initDB();



const PaperPackage = {
    findAll: async () => {
        try {
            return await Query.getAll("Paper_Package");
        } catch (error) {
            console.error("Error fetching all Paper Packages:", error);
            throw error;
        }
    },
    getPaperPackageByID: async () => {
        try {
            const [rows] = await pool.query('SELECT * FROM Paper_Package WHERE id = ?', [pp_ID]);
            return rows;
        } catch (error) {
            console.log(error);
        }
    },
    createPaperPackage: async (name, quantity, price) => {
        try {
            const data = { name, quantity, price };
            const result = await Query.insertSingleRow("Paper_Package", data);
            return { pp_ID: result.insertId, ...data };
        } catch (error) {
            console.error("Error creating Paper Package:", error);
            throw error;
        }
    },
    updatePaperPackage: async (pp_ID, name, quantity, price) => {
        try {
            const data = { name, quantity, price };
            await Query.updateRow("Paper_Package", data, { pp_ID });
            return { pp_ID, ...data };
        } catch (error) {
            console.error("Error updating Paper Package:", error);
            throw error;
        }
    },
    deletePaperPackage: async (pp_ID) => {
        try {
            await Query.deleteRow("Paper_Package", { pp_ID });
            return { pp_ID };
        } catch (error) {
            console.error("Error deleting Paper Package:", error);
            throw error;
        }
    }
};

module.exports = PaperPackage;
