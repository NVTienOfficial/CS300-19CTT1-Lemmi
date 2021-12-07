const Comment = require("../models/comment");

class CommentRepo {
    

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
            let comment = Comment.findOne({
                where: {
                    comment_id: id
                }
            })
            return !(!comment)
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }
}

module.exports = CommentRepo;