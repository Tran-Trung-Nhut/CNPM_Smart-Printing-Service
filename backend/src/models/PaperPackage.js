const { connectDB } = require("../config/config.js");

let pool;

async function initDB() {
    pool = await connectDB();
}

initDB();

const PaperPackage = {
    findAll: async () => {
        try {
            const [rows] = await pool.query('SELECT * FROM Paper_Package');
            return rows;
        } catch (error) {
            console.log(error);
        }
    },
    createPaperPackage: async (name, quantity, price) => {
        try {
            const [result] = await pool.query('INSERT INTO Paper_Package (name, quantity, price) VALUES (?, ?, ?)', [name, quantity, price]);
            const pp_ID = result.insertId;
            return { pp_ID, name, quantity, price};
        } catch (error) {
            console.log(error);
        }   
    },
    updatePaperPackage: async ( pp_ID, name, quantity, price) => {
        try {
            await pool.query('UPDATE Paper_Package SET name = ?, quantity = ?, price = ? WHERE pp_ID = ?', [name, quantity, price, pp_ID]);
            return {pp_ID, name, quantity, price};
        } catch (error) {
            console.log(error);
        } 
    },
    deletePaperPackage: async (pp_ID) => {
        try {
            await pool.query('DELETE FROM Paper_Package WHERE pp_ID = ?', [pp_ID]);
            return {pp_ID};
        } catch (error) {
            console.log(error);
        } 
    } 
};

module.exports = PaperPackage;
