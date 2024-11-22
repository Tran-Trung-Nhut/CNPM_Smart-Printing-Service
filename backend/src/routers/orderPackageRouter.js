module.exports = (app) => {
    const orderPackage = require("../controllers/orderPackageController");
    const express = require("express");
    const router = express.Router();

    router.get("/", orderPackage.getAllOrderPackages);
    router.post("/", orderPackage.createOrderPackage);
    router.put("/:id1/:id2", orderPackage.updateOrderPackage);
    router.delete("/:id1/:id2", orderPackage.deleteOrderPackage);
  
    app.use("/api/v1/orderpackage", router);
};