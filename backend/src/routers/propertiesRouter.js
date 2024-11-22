module.exports = (app) => {
    const properties = require("../controllers/propertiesController");
    const express = require("express");
    const router = express.Router();

    router.get("/", properties.getAllProperties);
    router.get("/:id", properties.getPropertiesByID);
    router.post("/", properties.createProperties);
    router.put("/:id", properties.updateProperties);
    router.delete("/:id", properties.deleteProperties);
  
    app.use("/api/v1/properties", router);
};