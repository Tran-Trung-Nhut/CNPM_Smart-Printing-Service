module.exports = (router) => {
    const order = require("../controllers/orderController");
    router.get("/order", order.getAllOrders);
    router.post("/order", order.createOrder);
    router.put("/order/:id", order.updateOrder);
    router.delete("/order/:id", order.deleteOrder);
};