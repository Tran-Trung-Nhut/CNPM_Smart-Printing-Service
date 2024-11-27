module.exports = (router) => {
    const orderPackage = require("../controllers/orderPackageController");
    router.get("/orderpackage", orderPackage.getAllOrderPackages);
    router.post("/orderpackage", orderPackage.createOrderPackage);
    router.put("/orderpackage/:id1/:id2", orderPackage.updateOrderPackage);
    router.delete("/orderpackage/:id1/:id2", orderPackage.deleteOrderPackage);
};