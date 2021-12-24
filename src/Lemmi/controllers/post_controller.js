const router = require("express").Router();

const PostService = require("../services/post_service");
const VoteService = require("../services/vote_service");
const CommentService = require("../services/comment_service");

const sPost = new PostService();
const sVote = new VoteService();
const sComment = new CommentService();

router.post("/create", async (req, res) => {
    try {
        let post = await sPost.createPost(req.body);
        return res.status(201).json({
            status: "OK",
            message: "Success",
            data: post,
        });
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

router.get("", async (req, res) => {
    try {
        let posts = await sPost.getAllPosts();
        return res.status(201).json({
            status: "OK",
            message: "Success",
            data: posts,
        });
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const post = await sPost.getPostByID(req.params.id);
        const vote = await sVote.getPostVote(req.params.id);
        const comment = await sComment.getPostComments(req.params.id);
        const userid = req.session.id;
        const username = req.session.username;
        req.session.redirectTo = `/post/${req.params.id}`;

        res.render('postdetail', {userid, username, post, vote, comment});
        
    }
    catch (err) {
        
        return res.status(err.statusCode).json(err);
    }
});

router.get("/user", async (req, res) => {
    try {
        let posts = await sPost.getAllPostsByUser(req.query.id);
        return res.status(201).json({
            status: "OK",
            message: "Success",
            data: posts,
        });
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

router.delete("", async (req, res) => {
    try {
        await sPost.deletePostByID(req.query.id);
        return res.status(200).json({
            status: "OK",
            message: "success",
        })
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
})

router.delete("/user", async (req, res) => {
    try {
        await sPost.deletePostByUser(req.query.id);
        return res.status(200).json({
            status: "OK",
            message: "success",
        })
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
})

module.exports = router;