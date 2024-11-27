module.exports = (router) => {
    const autoPaperController = require("../controllers/autoPaperController");

    router.get("/paper", autoPaperController.getAllAutoPapers);
    router.post("/paper", autoPaperController.createAutoPaper);
    router.put("/paper/:semester", autoPaperController.updateAutoPaper);
    router.post("/paper/buy", autoPaperController.buyPages);
};
