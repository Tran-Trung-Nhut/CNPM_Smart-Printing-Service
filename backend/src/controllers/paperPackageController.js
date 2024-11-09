const PaperPackage = require('../models/PaperPackage');

exports.getAllPaperPackages = async (req, res) => {
    try {
        const allData = await PaperPackage.findAll();
        res.status(200).json({ status: 200, data: allData, message: "Succesfully Paper Package Retrieved!" });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error Retrieving Paper Package' });
    }
};

exports.createPaperPackage = async (req, res) => {
    try {
        const { name, quantity, price} = req.body;
        const postData = await PaperPackage.createPaperPackage(name, quantity, price);
        res.status(200).json({ status: 200, data: postData, message: "Succesfully Create Paper Package!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: 'Error Create Paper Package' });
    }
};

exports.updatePaperPackage = async (req, res) => {
    try {
        const pp_ID = req.params.id;
        const { name, quantity, price} = req.body;
        const updateData = await PaperPackage.updatePaperPackage(pp_ID, name, quantity, price);
        res.status(200).json({ status: 200, data: updateData, message: "Succesfully Update Paper Package!" });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error Update Paper Package' });
    }
};

exports.deletePaperPackage = async (req, res) => {
    try {
        const pp_ID = req.params.id;
        const deleteData = await PaperPackage.deletePaperPackage(pp_ID);
        res.status(200).json({ status: 200, data: deleteData, message: "Succesfully Delete Paper Package!" });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error Delete Paper Package' });
    }
};