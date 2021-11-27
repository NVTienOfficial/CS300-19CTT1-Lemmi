const router = require("express").Router();

const CommentService = require("../services/comment_service");

const sComment = new CommentService();



module.exports = router;