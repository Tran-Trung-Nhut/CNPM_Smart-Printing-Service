const { connectDB } = require("../config/config.js");
const query = require("../database/query.js");

let pool;

async function initDB() {
    pool = await connectDB();
}

initDB();
const printerModel = {
    getAllPrinters: async () => {
        const condition = {};
        let printers = await query.getAll("Printer", condition)
            .then((rows) => {
                return rows;
            })
            .catch((error) => {
                console.log(error);
            });
        return printers;
    },
};

module.exports = printerModel;
