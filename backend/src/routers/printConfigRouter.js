module.exports = (app) => {
    const printConfig = require("../controllers/printConfigController.js");
    const express = require("express");
    const router = express.Router();

    // Get all print configuation
    router.get("/", printConfig.getAllPrintConfigs);
  
    app.use("/api/v1/printconfig", router);
};