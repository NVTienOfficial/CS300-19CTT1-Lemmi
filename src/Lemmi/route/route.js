const Express = require("express");
const router = Express.Router();

const userController = require("../controller/user_controller");
const accountController = require("../controller/account_controller");

//router.use("/user", userController);
router.use("/account", accountController);

module.exports = router;