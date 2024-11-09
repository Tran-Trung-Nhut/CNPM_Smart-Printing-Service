module.exports = (app) => {
    const order = require("../controllers/orderController");
    const express = require("express");
    const router = express.Router();

    router.get("/", order.getAllOrders);
    router.post("/", order.createOrder);
    router.put("/:id", order.updateOrder);
    router.delete("/:id", order.deleteOrder);
  
    app.use("/api/v1/order", router);
};