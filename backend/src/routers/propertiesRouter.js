module.exports = (router) => {
    const properties = require("../controllers/propertiesController");
    router.get("/properties", properties.getAllProperties);
    router.get("/properties/:id", properties.getPropertiesByID);
    router.post("/properties", properties.createProperties);
    router.put("/properties/:id", properties.updateProperties);
    router.delete("/properties/:id", properties.deleteProperties);
};