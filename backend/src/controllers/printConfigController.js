const PrintConfig = require('../models/PrintConfig.js');

exports.getAllPrintConfigs = async (req, res) => {
    try {
        const configs = await PrintConfig.findAll();
        res.status(200).json({ status: 200, data: configs, message: "Succesfully Users Retrieved" });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error Retrieving Print Configuration' });
    }
};
