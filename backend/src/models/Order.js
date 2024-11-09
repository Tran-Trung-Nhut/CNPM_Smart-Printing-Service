const { connectDB } = require("../config/config.js");

let pool;

async function initDB() {
    pool = await connectDB();
}

initDB();

const Order = {
    findAll: async () => {
        try {
            const [rows] = await pool.query('SELECT * FROM Orders');
            return rows;
        } catch (error) {
            console.log(error);
        }
    },
    createOrder: async (user_ID, time, quantity, status) => {
        try {
            const [result] = await pool.query('INSERT INTO Orders (user_ID, time, quantity, status) VALUES (?, ?, ?, ?)', [user_ID, time, quantity, status]);
            const order_ID = result.insertId;
            return { order_ID, user_ID, time, quantity, status};
        } catch (error) {
            console.log(error);
        }   
    },
    updateOrder: async (order_ID, user_ID, time, quantity, status) => {
        try {
            await pool.query('UPDATE Orders SET user_ID = ?, time = ?, quantity = ?, status = ? WHERE order_ID = ?', [user_ID, time, quantity, status, order_ID]);
            return {order_ID, user_ID, time, quantity, status};
        } catch (error) {
            console.log(error);
        } 
    },
    deleteOrder: async (order_ID) => {
        try {
            await pool.query('DELETE FROM Orders WHERE order_ID = ?', [order_ID]);
            return {order_ID};
        } catch (error) {
            console.log(error);
        } 
    } 
};

module.exports = Order;
