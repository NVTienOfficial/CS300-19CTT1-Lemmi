const Express = require("express");
const router = Express.Router();

const userController = require("../controllers/user_controller");
const accountController = require("../controllers/account_controller");
const postController = require("../controllers/post_controller");
const commentController = require("../controllers/comment_controller");
const voteController = require("../controllers/vote_controller");
const districtController = require("../controllers/district_controller");

router.use("/user", userController);
router.use("/account", accountController);
router.use("/post", postController);
router.use("/comment", commentController);
router.use("/vote", voteController);
router.use("/district", districtController);

module.exports = router;