const { connectDB } = require("../config/config.js");
const Query = require("../config/query");

let pool;

async function initDB() {
    pool = await connectDB();
}

initDB();


const Document = {
    findAll: async (condition = {}) => {
        try {
            return await Query.getAll("Document", condition);
        } catch (error) {
            console.error("Error fetching all Documents:", error);
            throw error;
        }
    },


    createDocument: async (config_ID, name, size, lastModifiedDate) => {
        try {
            const data = { config_ID, name, size, lastModifiedDate };
            await Query.insertSingleRow("Document", data);
            return data;
        } catch (error) {
            console.error("Error creating Document:", error);
            throw error;
        }
    },

    updateDocument: async (config_ID, name, size, lastModifiedDate) => {
        try {
            const condition = { config_ID, name };
            const newData = { size, lastModifiedDate };
            await Query.updateRow("Document", newData, condition);
            return { config_ID, name, size, lastModifiedDate };
        } catch (error) {
            console.error("Error updating Document:", error);
            throw error;
        }
    },

    deleteDocument: async (config_ID, name) => {
        try {
            const condition = { config_ID, name };
            await Query.deleteRow("Document", condition);
            return condition;
        } catch (error) {
            console.error("Error deleting Document:", error);
            throw error;
        }
    }
};

module.exports = Document;
