const Document = require('../models/Document');

exports.getAllDocuments = async (req, res) => {
    try {
        const allData = await Document.findAll();
        res.status(200).json({ status: 200, data: allData, message: "Succesfully All Document Retrieved!" });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error All Retrieving Document' });
    }
};

exports.getDocumentByID = async (req, res) => {
    try {
        const config_ID = req.params.id;
        const data = await Document.findAll({config_ID})
        res.status(200).json({ status: 200, data: data, message: "Succesfully Document Retrieved By Config ID!" });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error Retrieving Document By Config ID' });
    }
};

exports.createDocument = async (req, res) => {
    try {
        const {config_ID, name, size, lastModifiedDate} = req.body;
        const postData = await Document.createDocument(config_ID, name, size, lastModifiedDate);
        res.status(200).json({ status: 200, data: postData, message: "Succesfully Create Document!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: 'Error Create Document' });
    }
};

exports.updateDocument = async (req, res) => {
    try {
        const config_ID = req.params.id;
        const name = req.params.name;
        const {size, lastModifiedDate} = req.body;
        const updateData = await Document.updateDocument(config_ID, name, size, lastModifiedDate);
        res.status(200).json({ status: 200, data: updateData, message: "Succesfully Update Document!" });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error Update Document' });
    }
};

exports.deleteDocument = async (req, res) => {
    try {
        const config_ID = req.params.id;
        const name = req.params.name;
        const deleteData = await Document.deleteDocument(config_ID, name);
        res.status(200).json({ status: 200, data: deleteData, message: "Succesfully Delete Document!" });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error Delete Document' });
    }
};