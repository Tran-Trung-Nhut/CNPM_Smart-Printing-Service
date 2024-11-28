module.exports = (router) => {
    const auth = "student"
    const usersController = require("../../controllers/usersController");
    const authenticateToken = require("../../middleware/verify/verify_authen");
    const authorizeRole = require("../../middleware/verify/verify_authoriza");
    router.get("/admin/users", authenticateToken, authorizeRole(auth), usersController.getUsers);

};
