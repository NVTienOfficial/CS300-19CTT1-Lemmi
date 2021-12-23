const Comment = require("../models/comment");
const Error = require("../config/error");
const sequelize = require("../config/database");

class CommentRepo {
    async createOne(comment) {
        try {
            const newComment = await Comment.create(comment);
            return newComment;
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async getAll() {
        try {
            const comments = await Comment.findAll();
            return comments;
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async getCommentByPost(id) {
        try {
            const comments = await Comment.findAll({
                where: {
                    post_id: id
                }
            });
            return comments;
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async deleteByID(id) {
        try {
            await Comment.destroy({
                where: {
                    comment_id: id
                }
            })
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async deleteByPost(id) {
        try {
            await Comment.destroy({
                where: {
                    post_id: id
                }
            })
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async deleteByUser(id) {
        try {
            await Comment.destroy({
                where: {
                    user_id: id
                }
            })
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async updateContentByID(id, content) {
        try {
            const newComment = await Comment.update(
                {content: content},
                {
                    where: {
                        comment_id: id,
                    }
                }
            )
            return newComment;
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async countByPost(post_id) {
        try {
            let n = await Comment.count({
                where: {
                    post_id: post_id
                }
            });
            return n;
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async count() {
        try {
            let n = await Comment.count();
            return n;
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async findByID(id) {
        try {
            let comment = Comment.findOne({
                where: {
                    comment_id: id
                }
            })
            return comment;
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async isExistID(id) {
        try {
            let comment = Comment.count({
                where: {
                    comment_id: id
                }
            })
            return (comment > 0);
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }
}

module.exports = CommentRepo;