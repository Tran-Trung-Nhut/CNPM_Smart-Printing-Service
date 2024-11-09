const { connectDB } = require("../config/config.js");

let pool;

async function initDB() {
    pool = await connectDB();
}

initDB();

const Document = {
    findAll: async () => {
        try {
            const [rows] = await pool.query('SELECT * FROM Document');
            return rows;
        } catch (error) {
            console.log(error);
        }
    },
    createDocument: async (config_ID, DName, noPage, pageSize) => {
        try {
            const [result] = await pool.query('INSERT INTO Document (config_ID, DName, noPage, pageSize) VALUES (?, ?, ?, ?)', [config_ID, DName, noPage, pageSize]);
            return { config_ID, DName, noPage, pageSize };
        } catch (error) {
            console.log(error);
        }   
    },
    updateDocument: async (config_ID, DName, noPage, pageSize) => {
        try {
            await pool.query('UPDATE Document SET noPage = ?, pageSize = ? WHERE config_ID = ? AND DName = ?', [ noPage, pageSize, config_ID, DName]);
            return { config_ID, DName, noPage, pageSize };
        } catch (error) {
            console.log(error);
        } 
    },
    deleteDocument: async (config_ID, DName) => {
        try {
            await pool.query('DELETE FROM Document WHERE config_ID = ? AND DName = ?', [config_ID, DName]);
            return {config_ID, DName};
        } catch (error) {
            console.log(error);
        } 
    } 
};

module.exports = Document;
