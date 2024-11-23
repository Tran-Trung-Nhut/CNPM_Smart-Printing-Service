const PrintConfig = require("../models/PrintConfig");

exports.getAllPrintConfigs = async (req, res) => {
    try {
        const allData = await PrintConfig.findAll();
        res.status(200).json({ status: 200, data: allData, message: "Successfully retrieved Print Configurations!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Error retrieving Print Configurations" });
    }
};

exports.createPrintConfig = async (req, res) => {
    try {
        const { printStart, printEnd, user_ID, printer_ID } = req.body;
        const postData = await PrintConfig.createPrintConfig(printStart, printEnd, user_ID, printer_ID);
        res.status(200).json({ status: 200, data: postData, message: "Successfully created Print Configuration!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Error creating Print Configuration" });
    }
};

exports.updatePrintConfig = async (req, res) => {
    try {
        const config_ID = req.params.id;
        const { printStart, printEnd, user_ID, printer_ID } = req.body;
        const updateData = await PrintConfig.updatePrintConfig(config_ID, printStart, printEnd, user_ID, printer_ID);
        res.status(200).json({ status: 200, data: updateData, message: "Successfully updated Print Configuration!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Error updating Print Configuration" });
    }
};

exports.deletePrintConfig = async (req, res) => {
    try {
        const config_ID = req.params.id;
        const deleteData = await PrintConfig.deletePrintConfig(config_ID);
        res.status(200).json({ status: 200, data: deleteData, message: "Successfully deleted Print Configuration!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Error deleting Print Configuration" });
    }
};
