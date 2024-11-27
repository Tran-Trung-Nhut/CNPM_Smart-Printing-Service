const { connectDB } = require("../config/config.js");
const Query = require("../config/query"); 

let pool;

async function initDB() {
    pool = await connectDB();
}

initDB();


const OrderPackage = {
    findAll: async () => {
        try {
            return await Query.getAll("Order_Package");
        } catch (error) {
            console.error("Error fetching all Order Packages:", error);
            throw error;
        }
    },
    createOrderPackage: async (order_ID, pp_ID) => {
        try {
            const data = { order_ID, pp_ID };
            await Query.insertSingleRow("Order_Package", data);
            return data;
        } catch (error) {
            console.error("Error creating Order Package:", error);
            throw error;
        }
    },
    updateOrderPackage: async (order_ID, pp_ID, newOrder_ID, newPP_ID) => {
        try {
            const data = { order_ID: newOrder_ID, pp_ID: newPP_ID };
            const condition = { order_ID, pp_ID };
            await Query.updateRow("Order_Package", data, condition);
            return data;
        } catch (error) {
            console.error("Error updating Order Package:", error);
            throw error;
        }
    },
    deleteOrderPackage: async (order_ID, pp_ID) => {
        try {
            const condition = { order_ID, pp_ID };
            await Query.deleteRow("Order_Package", condition);
            return condition;
        } catch (error) {
            console.error("Error deleting Order Package:", error);
            throw error;
        }
    }
};

module.exports = OrderPackage;
