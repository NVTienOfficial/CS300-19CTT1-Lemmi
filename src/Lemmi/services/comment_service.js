const CommentRepo = require("../repos/comment_repo");
const UserRepo = require("../repos/user_repo");
const PostRepo = require("../repos/post_repo");
const Error = require("../config/error");

const rComment = new CommentRepo();
const rUser = new UserRepo();
const rPost = new PostRepo();

class CommentService {
    async makeComment(comment) {
        const { user_id, post_id, content, comment_date, report} = comment;

        if (!user_id || !post_id || !content || report < 0)
            throw new Error(400, "Bad request");

        const existUser = await rUser.isExistID(user_id);
        const existPost = await rPost.isExistID(post_id);
        if (!existUser || !existPost)
            throw new Error(400, "Bad request");

        try {
            comment["comment_id"] = await this.generateNewID();
            const newComment = await rComment.createOne(comment)
            return newComment;
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async getAllComments() {
        try {
            const comments = await rComment.getAll();
            return comments;
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async getPostComments(id) {
        if (!id)
            throw new Error(400, "Bad request");

        try {
            const comments = await rComment.getCommentByPost(id);
            return comments;
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async getReplyComment(id) {
        try {
            const comments = await rComment.getCommentByComment(id);
            return comments;
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async deleteCommentByID(id) {
        if (!id)
            throw new Error(400, "Bad request");

        try {
            await rComment.deleteByID(id);
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async deleteCommentByPost(id) {
        if (!id)
            throw new Error(400, "Bad request");

        try {
            await rComment.deleteByPost(id);
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async deleteCommentByUser(id) {
        if (!id)
            throw new Error(400, "Bad request");

        try {
            await rComment.deleteByUser(id);
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async updateComment(comment) {
        const { comment_id, content } = comment;

        if (!comment_id || !content)
            throw new Error(400, "Bad request");

        try {
            const comment = await rComment.updateContentByID(comment_id, content);
            return comment;
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async generateNewID() {
        let id = await rComment.count();
        let cmt_id = await this.toStringID(id);
        const max_id = Math.pow(16,10) - 1;

        while (true) {
            let exist = await rComment.isExistID(cmt_id);

            if (exist) {
                id = ( (id % max_id ) + 8) % max_id;
                cmt_id = await this.toStringID(id);
            }
            else
                break;
        }
        
        return cmt_id;
    }

    async toStringID(id) {
        let str = id.toString(16);
        while (str.length < 10)
            str = '0' + str;
        return str;
    }
}

module.exports = CommentService;