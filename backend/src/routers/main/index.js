module.exports = (app) => {
    const express = require("express");
    const router = express.Router();
    require("./usersRoutes")(router);
    require("./fileTypeRoutes")(router);
    require("./autoPaperRoutes")(router);



    app.use("/api/v1", router);
};
