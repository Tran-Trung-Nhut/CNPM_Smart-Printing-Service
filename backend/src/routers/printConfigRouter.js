module.exports = (router) => {
    const printConfig = require("../controllers/printConfigController.js");
    router.get("/printconfig", printConfig.getAllPrintConfigs);
    router.post("/printconfig", printConfig.createPrintConfig);
    router.put("/printconfig/:id", printConfig.updatePrintConfig);
    router.put("/printconfig/complete/:id", printConfig.completePrintConfig);
    router.delete("/printconfig/:id", printConfig.deletePrintConfig);
};