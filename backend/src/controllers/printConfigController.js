const PrintConfig = require('../models/PrintConfig.js');

exports.getAllPrintConfigs = async (req, res) => {
    try {
        const allData = await PrintConfig.findAll();
        res.status(200).json({ status: 200, data: allData, message: "Succesfully Print Configurations Retrieved!" });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error Retrieving Print Configuration' });
    }
};

exports.createPrintConfig = async (req, res) => {
    try {
        const { printStart, printEnd, user_ID, printer_ID} = req.body;
        const postData = await PrintConfig.createPrintConfig(printStart, printEnd, user_ID, printer_ID);
        res.status(200).json({ status: 200, data: postData, message: "Succesfully Create Print Configuration!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: 'Error Create Print Configuration' });
    }
};

exports.updatePrintConfig = async (req, res) => {
    try {
        const config_ID = req.params.id;
        const { printStart, printEnd, user_ID, printer_ID} = req.body;
        const updateData = await PrintConfig.updatePrintConfig(config_ID, printStart, printEnd, user_ID, printer_ID);
        res.status(200).json({ status: 200, data: updateData, message: "Succesfully Update Print Configuration!" });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error Update Print Configuration' });
    }
};

exports.deletePrintConfig = async (req, res) => {
    try {
        const config_ID = req.params.id;
        const deleteData = await PrintConfig.deletePrintConfig(config_ID);
        res.status(200).json({ status: 200, data: deleteData, message: "Succesfully Delete Print Configuration!" });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error Delete Print Configuration' });
    }
};