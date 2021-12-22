const router = require("express").Router();
const auth = require("../middleware/auth");

const AccountService = require("../services/account_service");
const PostService = require("../services/post_service");

const sAccount = new AccountService();
const sPost = new PostService();

router.post("/login", async (req, res) => {
    try {
        let token = await sAccount.login(req.body);
        const username = req.body.username;
        // return res.status(200).json({
        //     status: "OK",
        //     message: "success",
        //     token: token
        // })
        //need user id
        //
        req.session.token = token;
        req.session.username = username;
        return res.redirect(`/`);
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

//Dat
router.get("/login", (req, res) => {
    res.render('login');
});

router.get("/", (req, res) => {
    const user = req.session.token || undefined;
    const username = req.session.username || undefined;
    console.log("body:", req.session);
    res.render('home', { user, username });
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