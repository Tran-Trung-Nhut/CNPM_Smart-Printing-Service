const printerModel = require('../models/printerModel');
const locationModel = require('../models/locationModel');

// Lấy tất cả các máy in kèm theo thông tin vị trí
exports.getAllPrinters = async (req, res) => {
    try {
        const printers = await printerModel.getAllPrinters();

        if (!printers || printers.length === 0) {
            return res.status(404).json({ status: 404, message: "No Printers Found" });
        }

        const formattedPrinters = printers.map(printer => ({
            Printer_ID: printer.Printer_ID,
            branchName: printer.branchName,
            model: printer.model,
            description: printer.description,
            status: printer.status,
            location: printer.location ? {
                campus: printer.location.campus,
                building: printer.location.building,
                room: printer.location.room
            } : null
        }));
        
        res.status(200).json({ status: 200, data: formattedPrinters, message: "Successfully Retrieved Printers!" });
    } catch (error) {
        console.error("Error Retrieving Printers:", error.message);
        res.status(500).json({ status: 500, message: 'Error Retrieving Printers', error: error.message });
    }
};

// Tạo mới máy in
exports.createPrinter = async (req, res) => {
    try {
        const { branchName, model, description, status = 'enable', location } = req.body;

        let loc_ID = null;
        if (location) {
            const existingLocation = await locationModel.findLocation(location);
            if (existingLocation) {
                loc_ID = existingLocation.Location_ID;
            } else {
                const newLocation = await locationModel.createLocation(location.campus, location.building, location.room);
                loc_ID = newLocation.Location_ID;
            }
        }

        const newPrinter = await printerModel.createPrinter(branchName, model, description, status, loc_ID);
        res.status(201).json({ status: 201, data: newPrinter, message: "Successfully Created Printer!" });
    } catch (error) {
        console.error("Error Creating Printer:", error);
        res.status(500).json({ status: 500, message: 'Error Creating Printer' });
    }
};


exports.updatePrinter = async (req, res) => {
    try {
        const printerId = req.params.id;
        const { branchName, model, description, status, location } = req.body;

        let loc_ID = null;
        if (location) {
            const existingLocation = await locationModel.findLocation(location);
            if (existingLocation) {
                loc_ID = existingLocation.Location_ID;
            } else {
                const newLocation = await locationModel.createLocation(location.campus, location.building, location.room);
                loc_ID = newLocation.Location_ID;
            }
        }

        const updatedPrinter = await printerModel.updatePrinter(printerId, { branchName, model, description, status, loc_ID });
        res.status(200).json({ status: 200, data: updatedPrinter, message: "Successfully Updated Printer!" });
    } catch (error) {
        console.error("Error Updating Printer:", error);
        res.status(500).json({ status: 500, message: 'Error Updating Printer' });
    }
};

exports.deletePrinter = async (req, res) => {
    try {
        const printerId = req.params.id;
        const deletedPrinter = await printerModel.deletePrinter(printerId);
        res.status(200).json({ status: 200, data: deletedPrinter, message: "Successfully Deleted Printer!" });
    } catch (error){
        console.error("Error Deleted Printer!!!", error);
        res.status(500).json({ status: 500, message: 'Error Deleted Printer!!!' });
    }
};