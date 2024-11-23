const { connectDB } = require("../config/config.js");
const Query = require("../config/query"); 

let pool;

async function initDB() {
    pool = await connectDB();
}

initDB();


const autoPaperModel = {
    getAllAutoPapers: async () => {
        try {
            return await Query.getAll("AutoPaper");
        } catch (error) {
            console.error("Error in getAllAutoPapers:", error);
            throw error;
        }
    },

    createAutoPapers: async (semester, number, scheduler, spso_ID) => {
        try {
            const data = { semester, number, scheduler, spso_ID };
            await Query.insertSingleRow("AutoPaper", data);
            return data;
        } catch (error) {
            console.error("Error in createAutoPaper:", error);
            throw error;
        }
    },

    updateAutoPaper: async (semester, number, scheduler) => {
        try {
            const condition = { semester };
            const newData = { number, scheduler };
            await Query.updateRow("AutoPaper", newData, condition);
            return { semester, number, scheduler };
        } catch (error) {
            console.error("Error in updateAutoPaper:", error);
            throw error;
        }
    },

    getStudentPageBalance: async (user_ID) => {
        try {
            const condition = { user_ID };
            const result = await Query.getRows("User", condition);
            return result[0]?.pageBalance || 0;
        } catch (error) {
            console.error("Error in getStudentPageBalance:", error);
            throw error;
        }
    },

    updateStudentPageBalance: async (user_ID, additionalPages) => {
        try {
            const condition = { user_ID };
            const newData = { pageBalance: `pageBalance + ${additionalPages}` };
            await Query.updateRow("User", newData, condition);
        } catch (error) {
            console.error("Error in updateStudentPageBalance:", error);
            throw error;
        }
    }
};

module.exports = autoPaperModel;
