module.exports = (router) => {
    const usersController = require("../../controllers/usersController");
    const authenticateToken = require("../../middleware/verify_authen");
    const authorizeRole = require("../../middleware/verify_authoriza");
    router.get("/admin/users", authenticateToken, authorizeRole(["spso"]), usersController.getUsers);

};
