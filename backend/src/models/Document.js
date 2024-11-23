const { connectDB } = require("../config/config.js");
const Query = require("../config/query");

let pool;

async function initDB() {
    pool = await connectDB();
}

initDB();


const Document = {
    findAll: async () => {
        try {
            return await Query.getAll("Document");
        } catch (error) {
            console.error("Error fetching all Documents:", error);
            throw error;
        }
    },

    createDocument: async (config_ID, DName, noPage, pageSize) => {
        try {
            const data = { config_ID, DName, noPage, pageSize };
            await Query.insertSingleRow("Document", data);
            return data;
        } catch (error) {
            console.error("Error creating Document:", error);
            throw error;
        }
    },

    updateDocument: async (config_ID, DName, noPage, pageSize) => {
        try {
            const condition = { config_ID, DName };
            const newData = { noPage, pageSize };
            await Query.updateRow("Document", newData, condition);
            return { config_ID, DName, noPage, pageSize };
        } catch (error) {
            console.error("Error updating Document:", error);
            throw error;
        }
    },

    deleteDocument: async (config_ID, DName) => {
        try {
            const condition = { config_ID, DName };
            await Query.deleteRow("Document", condition);
            return condition;
        } catch (error) {
            console.error("Error deleting Document:", error);
            throw error;
        }
    }
};

module.exports = Document;
