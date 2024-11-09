const { connectDB } = require("../config/config.js");

let pool;

async function initDB() {
    pool = await connectDB();
}

initDB();

const OrderPackage = {
    findAll: async () => {
        try {
            const [rows] = await pool.query('SELECT * FROM Order_Package');
            return rows;
        } catch (error) {
            console.log(error);
        }
    },
    createOrderPackage: async (order_ID, pp_ID) => {
        try {
            const [result] = await pool.query('INSERT INTO Order_Package (order_ID, pp_ID) VALUES (?, ?)', [order_ID, pp_ID]);
            return { order_ID, pp_ID};
        } catch (error) {
            console.log(error);
        }   
    },
    updateOrderPackage: async (order_ID, pp_ID, newOrder_ID, newPP_ID) => {
        try {
            await pool.query('UPDATE Order_Package SET order_ID = ?, pp_ID = ? WHERE order_ID = ? AND pp_ID = ?', [ newOrder_ID, newPP_ID, order_ID, pp_ID]);
            return {newOrder_ID, newPP_ID};
        } catch (error) {
            console.log(error);
        } 
    },
    deleteOrderPackage: async (order_ID, pp_ID) => {
        try {
            await pool.query('DELETE FROM Order_Package WHERE order_ID = ? AND pp_ID = ?', [order_ID, pp_ID]);
            return {order_ID, pp_ID};
        } catch (error) {
            console.log(error);
        } 
    } 
};

module.exports = OrderPackage;
