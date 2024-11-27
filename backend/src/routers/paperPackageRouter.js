module.exports = (router) => {
    const paperPackage = require("../controllers/paperPackageController");
    router.get("/paperpackage", paperPackage.getAllPaperPackages);
    router.post("/paperpackage", paperPackage.createPaperPackage);
    router.put("/paperpackage/:id", paperPackage.updatePaperPackage);
    router.delete("/paperpackage/:id", paperPackage.deletePaperPackage);
};
