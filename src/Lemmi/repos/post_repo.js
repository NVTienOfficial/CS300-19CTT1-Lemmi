const Post = require("../models/post");

class PostRepo {
    

    async count() {
        try {
            let n = await Post.count();
            return n;
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async findByID(id) {
        try {
            let post = Post.findOne({
                where: {
                    post_id: id
                }
            })
            return post;
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async isExistID(id) {
        try {
            let post = Post.findOne({
                where: {
                    post_id: id
                }
            })
            return !(!post)
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }
}

module.exports = PostRepo;