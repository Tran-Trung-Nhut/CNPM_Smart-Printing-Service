const PrintConfig = require("../models/PrintConfig");
const Document = require('../models/Document');  

exports.getAllPrintConfigs = async (req, res) => {
    try {
        const { config_ID, user_ID, printer_ID, status } = req.query; 
        const condition = {}; 

        if (config_ID) condition.config_ID = config_ID;
        if (user_ID) condition.user_ID = user_ID;
        if (printer_ID) condition.printer_ID = printer_ID;
        if (status) condition.status = status;
        const configs = await PrintConfig.findAll(condition);
        if (!configs || configs.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "No print configurations found."
            });
        }
        let datas = [];
        for (const config of configs) {
                const configDocuments = await Document.findAll({ config_ID: config.config_ID });
                datas.push({
                    ...config,
                    documents : configDocuments
                });
        }
        res.status(200).json({
            status: 200,
            data: datas, 
            message: "Successfully retrieved print configurations" + (user_ID ? " and documents" : "") + "!"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Error retrieving print configurations" + (user_ID ? " and documents" : "") + "." });
    }
};

exports.createPrintConfig = async (req, res) => {
    try {
        const { user_ID, printer_ID, numPages, numCopies, paperSize, printSide, orientation} = req.body;
        const postData = await PrintConfig.createPrintConfig(user_ID, printer_ID, numPages, numCopies, paperSize, printSide, orientation);
        res.status(200).json({ status: 200, data: postData, message: "Successfully created Print Configuration!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Error creating Print Configuration" });
    }
};

exports.updatePrintConfig = async (req, res) => {
    try {
        const config_ID = req.params.id;
        const { user_ID, printer_ID, numPages, numCopies, paperSize, printSide, orientation} = req.body;
        const updateData = await PrintConfig.updatePrintConfig(config_ID, user_ID, printer_ID, numPages, numCopies, paperSize, printSide, orientation);
        res.status(200).json({ status: 200, data: updateData, message: "Successfully updated Print Configuration!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Error updating Print Configuration" });
    }
};

exports.completePrintConfig = async (req, res) => {
    try {
        const config_ID = req.params.id;
        const updateData = await PrintConfig.completePrintConfig(config_ID);
        res.status(200).json({ status: 200, data: updateData, message: "Successfully Completed Print Configuration!" });
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
