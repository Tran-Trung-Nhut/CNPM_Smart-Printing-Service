const { connectDB } = require("../config/config.js");
const query = require("../config/query.js");

let pool;

async function initDB() {
    pool = await connectDB();
}

initDB();

const Properties = {
    findAll: async () => {
        try {
            const rows = await query.getAll("Properties");
            return rows;
        } catch (error) {
            console.log(error);
        }
    },

    getPropertiesByID: async (config_ID) => {
        try {
            const rows = await query.getOne("Properties", { config_ID });
            return rows;
        } catch (error) {
            console.log(error);
        }
    },

    createProperties: async (config_ID, pageSize, noCopy, noPage, startPage, endPage, scale, isDuplex, orientation) => {
        try {
            const newProperty = {
                config_ID,
                pageSize,
                noCopy,
                noPage,
                startPage,
                endPage,
                scale,
                isDuplex,
                orientation
            };
            const result = await query.insertSingleRow("Properties", newProperty);
            return { config_ID, pageSize, noCopy, noPage, startPage, endPage, scale, isDuplex, orientation };
        } catch (error) {
            console.log(error);
        }
    },

    updateProperties: async (config_ID, pageSize, noCopy, noPage, startPage, endPage, scale, isDuplex, orientation) => {
        try {
            const updatedProperty = {
                pageSize,
                noCopy,
                noPage,
                startPage,
                endPage,
                scale,
                isDuplex,
                orientation
            };
            await query.updateRow("Properties", updatedProperty, { config_ID });
            return { config_ID, pageSize, noCopy, noPage, startPage, endPage, scale, isDuplex, orientation };
        } catch (error) {
            console.log(error);
        }
    },

    deleteProperties: async (config_ID) => {
        try {
            await query.deleteRow("Properties", { config_ID });
            return { config_ID };
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = Properties;
