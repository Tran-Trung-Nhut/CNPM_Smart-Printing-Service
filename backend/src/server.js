const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Smart Printing Service!");
});

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.use("/api/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

require("./config/connection.js");
require("./routers/printConfigRouter.js")(app);
require("./routers/documentRouter.js")(app);
require("./routers/orderRouter.js")(app);
require("./routers/paperPackageRouter.js")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} ✨`);
});
