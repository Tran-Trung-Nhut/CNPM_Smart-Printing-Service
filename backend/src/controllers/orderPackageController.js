const OrderPackage = require('../models/OrderPackage');

exports.getAllOrderPackages = async (req, res) => {
    try {
        const allData = await OrderPackage.findAll();
        res.status(200).json({ status: 200, data: allData, message: "Succesfully Order Package Retrieved!" });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error Retrieving Order Package' });
    }
};

exports.createOrderPackage = async (req, res) => {
    try {
        const { order_ID, pp_ID} = req.body;
        const postData = await OrderPackage.createOrderPackage(order_ID, pp_ID);
        res.status(200).json({ status: 200, data: postData, message: "Succesfully Create Order Package!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: 'Error Create Order Package' });
    }
};

exports.updateOrderPackage = async (req, res) => {
    try {
        const order_ID = req.params.id1;
        const pp_ID = req.params.id2;
        const { newOrder_ID, newPP_ID} = req.body;
        const updateData = await OrderPackage.updateOrderPackage(order_ID, pp_ID, newOrder_ID, newPP_ID);
        res.status(200).json({ status: 200, data: updateData, message: "Succesfully Update Order Package!" });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error Update Order Package' });
    }
};

exports.deleteOrderPackage = async (req, res) => {
    try {
        const order_ID = req.params.id1;
        const pp_ID = req.params.id2;
        const deleteData = await OrderPackage.deleteOrderPackage(order_ID, pp_ID);
        res.status(200).json({ status: 200, data: deleteData, message: "Succesfully Delete Order Package!" });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error Delete Order Package' });
    }
};