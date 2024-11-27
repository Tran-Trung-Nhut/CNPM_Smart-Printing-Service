const Properties = require('../models/Properties');

exports.getAllProperties = async (req, res) => {
    try {
        const allData = await Properties.findAll();
        res.status(200).json({ status: 200, data: allData, message: "Succesfully All Properties Retrieved!" });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error All Retrieving Properties' });
    }
};

exports.getPropertiesByID = async (req, res) => {
    try {
        const config_ID = req.params.id;
        const data = await Properties.getPropertiesByID(config_ID);
        res.status(200).json({ status: 200, data: data, message: "Succesfully Properties Retrieved By Config ID!" });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error Retrieving Properties By Config ID' });
    }
};

exports.createProperties = async (req, res) => {
    try {
        const {config_ID, pageSize, noCopy, noPage, startPage, endPage , scale , isDuplex , orientation} = req.body;
        const postData = await Properties.createProperties(config_ID, pageSize, noCopy, noPage, startPage, endPage , scale , isDuplex , orientation);
        res.status(200).json({ status: 200, data: postData, message: "Succesfully Create Properties!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: 'Error Create Properties' });
    }
};

exports.updateProperties = async (req, res) => {
    try {
        const config_ID = req.params.id;
        const {pageSize, noCopy, noPage, startPage, endPage , scale , isDuplex , orientation} = req.body;
        const updateData = await Properties.updateProperties(config_ID, pageSize, noCopy, noPage, startPage, endPage , scale , isDuplex , orientation);
        res.status(200).json({ status: 200, data: updateData, message: "Succesfully Update Properties!" });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error Update Properties' });
    }
};

exports.deleteProperties = async (req, res) => {
    try {
        const config_ID = req.params.id;
        const deleteData = await Properties.deleteProperties(config_ID);
        res.status(200).json({ status: 200, data: deleteData, message: "Succesfully Delete Properties!" });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error Delete Properties' });
    }
};