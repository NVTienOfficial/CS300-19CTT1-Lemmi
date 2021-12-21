const router = require("express").Router();
const auth = require("../middleware/auth");

const AccountService = require("../services/account_service");
const PostService = require("../services/post_service");

const sAccount = new AccountService();
const sPost = new PostService();

router.post("/login", async (req, res) => {
    try {
        let token = await sAccount.login(req.body);
        return res.status(200).json({
            status: "OK",
            message: "success",
            token: token
        })
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

router.get("", async (req, res) => {
    try {
        const post_id = await sPost.getPopularPosts(40);
        const posts = await sPost.getPostsByID(post_id);
        return res.status(200).json({
            status: "OK",
            message: "success",
            data: posts,
        })
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

router.post("", async (req, res) => {
    try {
        const post_id = await sPost.getPopularPosts(40);
        const posts = await sPost.getPostsByID(post_id);
        return res.status(200).json({
            status: "OK",
            message: "success",
            data: posts,
        })
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

router.head("", async (req, res) => {
    try {
        const post_id = await sPost.getPopularPosts(40);
        const posts = await sPost.getPostsByID(post_id);
        return res.status(200).json({
            status: "OK",
            message: "success",
            data: posts,
        })
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

module.exports = router;