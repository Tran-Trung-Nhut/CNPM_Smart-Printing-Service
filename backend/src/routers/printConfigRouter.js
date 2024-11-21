module.exports = (app) => {
    const printConfig = require("../controllers/printConfigController.js");
    const express = require("express");
    const router = express.Router();

    // Get all print configuation
    router.get("/", printConfig.getAllPrintConfigs);
    router.get("/:id", printConfig.getPrintConfigByID);
    router.post("/", printConfig.createPrintConfig);
    router.put("/:id", printConfig.updatePrintConfig);
    router.delete("/:id", printConfig.deletePrintConfig);
  
    app.use("/api/v1/printconfig", router);
};