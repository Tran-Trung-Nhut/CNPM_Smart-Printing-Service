module.exports = (app) => {
    const document = require("../controllers/documentController");
    const express = require("express");
    const router = express.Router();

    router.get("/", document.getAllDocuments);
    router.get("/:id", document.getDocumentByID);
    router.post("/", document.createDocument);
    router.put("/:id/:name", document.updateDocument);
    router.delete("/:id/:name", document.deleteDocument);
  
    app.use("/api/v1/document", router);
};