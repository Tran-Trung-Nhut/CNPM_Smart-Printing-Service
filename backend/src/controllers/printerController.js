const printerModel = require('../models/printerModel');
exports.getAllPrinters = async (req, res) => {
    try {
        const printers = await printerModel.getAllPrinters();
        res.status(200).json({ status: 200, data: printers, message: "Succesfully Printers Retrieved!" });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error Retrieving Printers' });
    }
};