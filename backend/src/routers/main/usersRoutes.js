module.exports = (app) =>{
    const express = require("express");
    const router = express.Router();
    const usersController = require("../../controllers/main/usersController");

    router.get("/", usersController.getAllUsers);//spso
    router.get("/:id", usersController.getUserById)//spso và stu
    router.put("/:id", usersController.updateUser);//spso và stu
    router.delete("/:id", usersController.deleteUser);//spso maybe not
    router.post("/", usersController.createUser); // spso maybe
    app.use("/api/v1/users", router);
}