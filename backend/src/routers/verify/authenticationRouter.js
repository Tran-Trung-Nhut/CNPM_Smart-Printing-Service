
module.exports = (router) => {
    const authController = require("../../controllers/verify/authenticationController");
    router.post("/login", authController.login);
    router.post("/register", authController.register);
    router.post("/logout", authController.logout);
};
