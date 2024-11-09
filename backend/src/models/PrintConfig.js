const { connectDB } = require("../config/config.js");
const { createPrintConfig } = require("../controllers/printConfigController.js");

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
