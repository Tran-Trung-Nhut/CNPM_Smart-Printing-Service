const Order = require('../models/Order');

exports.getAllOrders = async (req, res) => {
    try {
        const allData = await Order.findAll();
        res.status(200).json({ status: 200, data: allData, message: "Succesfully All Order Retrieved!" });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error All Retrieving Order' });
    }
};

exports.getOrderByID = async (req, res) => {
    try {
        const order_ID = req.params.id;
        const data = await Order.findAll(order_ID);
        res.status(200).json({ status: 200, data: data, message: "Succesfully Order Retrieved By ID!" });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error Retrieving Order By ID' });
    }
};

exports.createOrder = async (req, res) => {
    try {
        const { user_ID, time, quantity, status} = req.body;
        const postData = await Order.createOrder(user_ID, time, quantity, status);
        res.status(200).json({ status: 200, data: postData, message: "Succesfully Create Order!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: 'Error Create Order' });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const order_ID = req.params.id;
        const { user_ID, time, quantity, status} = req.body;
        const updateData = await Order.updateOrder(order_ID, user_ID, time, quantity, status);
        res.status(200).json({ status: 200, data: updateData, message: "Succesfully Update Order!" });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error Update Order' });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const order_ID = req.params.id;
        const deleteData = await Order.deleteOrder(order_ID);
        res.status(200).json({ status: 200, data: deleteData, message: "Succesfully Delete Order!" });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error Delete Order' });
    }
};