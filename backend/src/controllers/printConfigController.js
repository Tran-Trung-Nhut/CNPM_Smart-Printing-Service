const PrintConfig = require('../models/PrintConfig.js');

exports.getAllPrintConfigs = async (req, res) => {
    try {
        const allData = await PrintConfig.findAll();
        res.status(200).json({ status: 200, data: allData, message: "Succesfully All Print Configurations Retrieved!" });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error ALl Retrieving Print Configuration' });
    }
};

exports.getPrintConfigByID = async (req, res) => {
    try {
        const config_ID = req.params.id;
        const allData = await PrintConfig.getPrintConfigByID(config_ID);
        const config = allData.row;
        const doc = allData.doc;
        const prop = allData.prop;
        res.status(200).json({ status: 200,
            data: {
                id: config.config_ID,
                document: doc,
                total_pages: prop.noPage,
                page_size: prop.pageSize,
                start_time: config.printStart,
                end_time: config.printEnd
            },
            message: "Succesfully Print Configurations Retrieved By ID!" });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error Retrieving Print Configuration BY ID' });
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