const printConfigRouter = require("./printConfigRouter");

module.exports = (app) => {
    const express = require("express");
    const router = express.Router();
    require("./usersRouter")(router);
    require("./fileTypeRouter")(router);
    require("./autoPaperRouter")(router);
    require("./printerRouter")(router);
    require("./paperPackageRouter")(router);
    require("./orderPackageRouter")(router);
    require("./orderRouter")(router);
    require("./printConfigRouter")(router);
    require("./documentRouter")(router);
    require("./verify/[example]authorizationRouter")(router);
    require("./verify/authenticationRouter")(router);
    require("./propertiesRouter")(router);
    require("./locationRouter")(router);
    app.use("/api/v1", router);
};
