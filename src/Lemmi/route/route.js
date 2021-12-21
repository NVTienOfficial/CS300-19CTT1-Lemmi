const Express = require("express");
const router = Express.Router();

const rootController = require("../controllers/root_controller");
const userController = require("../controllers/user_controller");
const accountController = require("../controllers/account_controller");
const postController = require("../controllers/post_controller");
const commentController = require("../controllers/comment_controller");
const voteController = require("../controllers/vote_controller");
const districtController = require("../controllers/district_controller");
const tagController = require("../controllers/tag_controller");
const imageController = require("../controllers/image_controller");

router.use("", rootController);
router.use("/user", userController);
router.use("/account", accountController);
router.use("/post", postController);
router.use("/comment", commentController);
router.use("/vote", voteController);
router.use("/district", districtController);
router.use("/tag", tagController);
router.use("/img", imageController);

module.exports = router;