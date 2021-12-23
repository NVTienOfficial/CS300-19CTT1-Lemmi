const router = require("express").Router();
const auth = require("../middleware/auth");

const AccountService = require("../services/account_service");
const PostService = require("../services/post_service");

const sAccount = new AccountService();
const sPost = new PostService();

router.post("/login", async (req, res) => {
    try {
        let result = await sAccount.login(req.body);
        const username = req.body.username;
        req.session.token = result.token;
        req.session.username = username;
        req.session.id = result.id;
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

router.get("/", async (req, res) => {
    try {
        /* 
        ** Return three objects containing posts
        ** {
        **    newest: []            -> sorted array of posts
        **    comment: []           -> sorted array of posts
        **    vote: []              -> sorted array of posts
        ** }
        **
        ** Each of posts in three above objects (newest, etc)
        ** {
        **    post_id:              -> post id
        **    title:                -> title
        **    content:              -> content
        **    star:                 -> star point
        **    report:               -> number of report
        **    user_id:              -> user id
        **    post_date:            -> date when post is created
        **    upvote:               -> number of upvote
        **    downvote:             -> number of downvote
        **    n_comment:            -> number of comments
        **    comment: []           -> array of comment in posts
        **    tag: []               -> array of tag names
        **    district:             -> district tag name            (not yet)
        **    name:                 -> name of user
        ** }
        */
        const newest_post = await sPost.getNewestPosts(40);
        const comment_post = await sPost.getMostCommentPosts(40);
        const vote_post = await sPost.getMostVotePost(40);

        // Take this object to parse layout       ** NOTICE **
        const posts = {
            newest: newest_post,
            comment: comment_post,
            vote: vote_post,
        }
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
    const token = req.session.token || undefined;
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

// router.post("", async (req, res) => {
//     try {
//         const post_id = await sPost.getPopularPosts(40);
//         const posts = await sPost.getPostsByID(post_id);
//         return res.status(200).json({
//             status: "OK",
//             message: "success",
//             data: posts,
//         })
//     }
//     catch (err) {
//         return res.status(err.statusCode).json(err);
//     }
// });

// router.head("", async (req, res) => {
//     try {
//         const post_id = await sPost.getPopularPosts(40);
//         const posts = await sPost.getPostsByID(post_id);
//         return res.status(200).json({
//             status: "OK",
//             message: "success",
//             data: posts,
//         })
//     }
//     catch (err) {
//         return res.status(err.statusCode).json(err);
//     }
// });

module.exports = router;