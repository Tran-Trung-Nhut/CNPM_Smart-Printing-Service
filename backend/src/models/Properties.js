const { connectDB } = require("../config/config.js");

let pool;

async function initDB() {
    pool = await connectDB();
}

initDB();

const Properties = {
    findAll: async () => {
        try {
            const [rows] = await pool.query('SELECT * FROM Properties');
            return rows;
        } catch (error) {
            console.log(error);
        }
    },
    getPropertiesByID: async (config_ID) => {
        try {
            const [rows] = await pool.query('SELECT * FROM Properties WHERE config_ID = ?', [config_ID]);
            return rows;
        } catch (error) {
            console.log(error);
        }
    },
    createProperties: async (config_ID, pageSize, noCopy, noPage, startPage, endPage , scale , isDuplex , orientation) => {
        try {
            await pool.query('INSERT INTO Properties (config_ID, pageSize, noCopy, noPage, startPage, endPage , scale , isDuplex , orientation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [config_ID, pageSize, noCopy, noPage, startPage, endPage , scale , isDuplex , orientation]);
            return { config_ID, pageSize, noCopy, noPage, startPage, endPage , scale , isDuplex , orientation };
        } catch (error) {
            console.log(error);
        }   
    },
    updateProperties: async (config_ID, pageSize, noCopy, noPage, startPage, endPage , scale , isDuplex , orientation) => {
        try {
            await pool.query('UPDATE Document SET pageSizeb= ?, noCopy= ?, noPage= ?, startPage= ?, endPage = ?, scale = ?, isDuplex = ?, orientation = ? WHERE config_ID = ?', [ pageSize, noCopy, noPage, startPage, endPage , scale , isDuplex , orientation, config_ID]);
            return { config_ID, pageSize, noCopy, noPage, startPage, endPage , scale , isDuplex , orientation };
        } catch (error) {
            console.log(error);
        } 
    },
    deleteProperties: async (config_ID) => {
        try {
            await pool.query('DELETE FROM Properties WHERE config_ID = ? ', [config_ID]);
            return {config_ID};
        } catch (error) {
            console.log(error);
        } 
    } 
};

module.exports = Properties;
