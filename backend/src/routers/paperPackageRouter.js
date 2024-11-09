module.exports = (app) => {
    const paperPackage = require("../controllers/paperPackageController");
    const express = require("express");
    const router = express.Router();

    router.get("/", paperPackage.getAllPaperPackages);
    router.post("/", paperPackage.createPaperPackage);
    router.put("/:id", paperPackage.updatePaperPackage);
    router.delete("/:id", paperPackage.deletePaperPackage);
  
    app.use("/api/v1/paperpackage", router);
};