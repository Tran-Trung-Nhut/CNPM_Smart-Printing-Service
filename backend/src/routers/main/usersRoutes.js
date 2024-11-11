module.exports = (router) =>{
    const usersController = require("../../controllers/usersController");

    router.get("/users", usersController.getAllUsers); // spso
    router.get("/users/:id", usersController.getUserById); // spso và stu
    router.put("/users/:id", usersController.updateUser); // spso và stu
    router.delete("/users/:id", usersController.deleteUser); // spso maybe not
    router.post("/users", usersController.createUser); // spso maybe
    router.post("/users/login", usersController.login); // spso
}