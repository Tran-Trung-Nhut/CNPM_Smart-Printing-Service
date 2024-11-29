const { connectDB } = require("../config/config.js");
const document = require("./Document.js");
const properties = require("./Properties.js")

const Query = require("../config/query"); 


let pool;

async function initDB() {
    pool = await connectDB();
}

initDB();

const PrintConfig = {
    findAll: async (condition = {}) => {
        try {
            return await Query.getAll("PrintConfiguration", condition);
        } catch (error) {
            console.error("Error fetching all PrintConfigurations:", error);
            throw error;
        }
    },



    createPrintConfig: async (printStart, printEnd, user_ID, printer_ID) => {
        try {
            const data = { printStart, printEnd, user_ID, printer_ID };
            const result = await Query.insertSingleRow("PrintConfiguration", data);
            return { config_ID: result.insertId, ...data };
        } catch (error) {
            console.error("Error creating PrintConfiguration:", error);
            throw error;
        }
    },
    updatePrintConfig: async (config_ID, printStart, printEnd, user_ID, printer_ID) => {
        try {
            const data = { printStart, printEnd, user_ID, printer_ID };
            await Query.updateRow("PrintConfiguration", data, { config_ID });
            return { config_ID, ...data };
        } catch (error) {
            console.error("Error updating PrintConfiguration:", error);
            throw error;
        }
    },
    deletePrintConfig: async (config_ID) => {
        try {
            await Query.deleteRow("PrintConfiguration", { config_ID });
            return { config_ID };
        } catch (error) {
            console.error("Error deleting PrintConfiguration:", error);
            throw error;
        }
    }
};

module.exports = PrintConfig;
