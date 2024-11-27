module.exports = (router) => {
    const printerController = require("../controllers/printerController");
    router.get("/printers", printerController.getAllPrinters);
}