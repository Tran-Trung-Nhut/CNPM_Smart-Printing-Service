const { connectDB } = require("../config/config.js");
const document = require("./Document.js");
const properties = require("./Properties.js")

let pool;

async function initDB() {
    pool = await connectDB();
}

initDB();

const PrintConfig = {
    findAll: async () => {
        try {
            const [rows] = await pool.query('SELECT * FROM PrintConfiguration');
            return rows;
        } catch (error) {
            console.log(error);
        }
    },
    getPrintConfigByID: async (config_ID) => {
        try {
            const [row] = await pool.query('SELECT * FROM PrintConfiguration WHERE config_ID = ?', [config_ID]);
            const doc = await document.getDocumentByID(row.config_ID);
            const prop = await properties.getPropertiesByID(row.config_ID);
            return { row, doc, prop };
        } catch (error) {
            console.log(error);
        }
    },    
    createPrintConfig: async (printStart, printEnd, user_ID, printer_ID) => {
        try {
            const [result] = await pool.query('INSERT INTO PrintConfiguration (printStart, printEnd, user_ID, printer_ID) VALUES (?, ?, ?, ?)', [printStart, printEnd, user_ID, printer_ID]);
            const config_ID = result.insertId;
            return { config_ID, printStart, printEnd, user_ID, printer_ID };
        } catch (error) {
            console.log(error);
        }   
    },
    updatePrintConfig: async (config_ID, printStart, printEnd, user_ID, printer_ID) => {
        try {
            await pool.query('UPDATE PrintConfiguration SET printStart = ?, printEnd = ?, user_ID = ?, printer_ID = ? WHERE config_ID = ?', [printStart, printEnd, user_ID, printer_ID, config_ID]);
            return { config_ID, printStart, printEnd, user_ID, printer_ID };
        } catch (error) {
            console.log(error);
        } 
    },
    deletePrintConfig: async (config_ID) => {
        try {
            await pool.query('DELETE FROM PrintConfiguration WHERE config_ID = ?', [config_ID]);
            return {config_ID};
        } catch (error) {
            console.log(error);
        } 
    } 
};

module.exports = PrintConfig;
