const router = require("express").Router();

const CommentService = require("../services/comment_service");

const sComment = new CommentService();

router.get("/post", async (req, res) => {
    try {
        const comments = sComment.getPostComments(req.query.id);
        return res.status(200).json({
            status: "OK",
            message: "success",
            data: comments,
        })
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

router.get("", async (req, res) => {
    try {
        const comments = await sComment.getAllComments();
        return res.status(200).json({
            status: "OK",
            message: "success",
            data: comments,
        })
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

router.post("/create", async (req, res) => {
    try {
        
        const comment = await sComment.makeComment(req.body);
        return res.redirect(req.session.redirectTo || '/');
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

router.delete("", async (req, res) => {
    try {
        await sComment.deleteCommentByID(req.query.id);
        return res.status(200).json({
            status: "OK",
            message: "success",
        })
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

router.delete("/post", async (req, res) => {
    try {
        await sComment.deleteCommentByPost(req.query.id);
        return res.status(200).json({
            status: "OK",
            message: "success",
        })
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

router.delete("/user", async (req, res) => {
    try {
        await sComment.deleteCommentByUser(req.query.id);
        return res.status(200).json({
            status: "OK",
            message: "success",
        })
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

module.exports = router;