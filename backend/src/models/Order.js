const { connectDB } = require("../config/config.js");
const Query = require("../config/query");
let pool;

async function initDB() {
    pool = await connectDB();
}

initDB();



const Order = {
    findAll: async () => {
        try {
            return await Query.getAll("Orders");
        } catch (error) {
            console.error("Error fetching all Orders:", error);
            throw error;
        }
    },
    getOderByID: async (order_ID) => {
        try {
            const [rows] = await Query.getOne("Orders", { order_ID });
            return rows;
        } catch (error) {
            console.log(error);
        }
    },
    createOrder: async (data) => {
        try {
            data.dateOrder = new Date();
            const result = await Query.insertSingleRow("Orders", data);
            return { order_ID: result.insertId, ...data };
        } catch (error) {
            console.error("Error creating Order:", error);
            throw error;
        }
    },
    updateOrder: async (data = {}, order_ID) => {
        try {
            const condition = { order_ID };
            await Query.updateRow("Orders", data, condition);
            return { order_ID, ...data };
        } catch (error) {
            console.error("Error updating Order:", error);
            throw error;
        }
    },
    deleteOrder: async (order_ID) => {
        try {
            const condition = { order_ID };
            await Query.deleteRow("Orders", condition);
            return condition;
        } catch (error) {
            console.error("Error deleting Order:", error);
            throw error;
        }
    }
};

module.exports = Order;
