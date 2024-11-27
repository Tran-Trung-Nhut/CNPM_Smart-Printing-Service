module.exports = (router) => {
    const document = require("../controllers/documentController");
    router.get("/document", document.getAllDocuments);
    router.post("/document", document.createDocument);
    router.put("/document/:id/:name", document.updateDocument);
    router.delete("/document/:id/:name", document.deleteDocument);
};