const sequelize = require("../config/database");
const District = require("../models/district");
const Post = require("../models/post");
const Tag = require("../models/tag");
const PostTag = require("../models/post_tag");

class PostRepo {
    async createOne(post) {
        try {
            const newPost = await Post.create(post);
            return newPost;
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async getAll() {
        try {
            const posts = await Post.findAll();
            return posts;
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async getByVote(n) {
        try {
            const posts = await Post.findAll();
            return posts
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async getAllByUserID(id) {
        try {
            const posts = await Post.findAll({
                where: {
                    user_id: id
                }
            });
            return posts
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async deleteByID(id) {
        try {
            await Post.destroy({
                where: {
                    post_id: id 
                }
            });
        }
        catch (err) {
            throw new Error(405, err.message);
        }
    }

    async deleteByUserID(id) {
        try {
            await Post.destroy({
                where: {
                    user_id: id 
                }
            });
        }
        catch (err) {
            throw new Error(405, err.message);
        }
    }

    async getNewestPosts(n) {
        try {
            let posts = await Post.findAll({
                attributes: {
                    include: [
                        [sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM vote
                            WHERE vote.post_id = post.post_id AND vote.type = true
                        )`), 'upvote'],
                        [sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM vote
                            WHERE vote.post_id = post.post_id AND vote.type = false
                        )`), 'downvote'],
                        [sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM comment
                            WHERE comment.post_id = post.post_id
                        )`), 'n_comment'],
                        [sequelize.literal(`(
                            SELECT name
                            FROM "user"
                            WHERE "user".user_id = post.user_id
                        )`), 'user_name'],
                        [sequelize.literal(`(
                            SELECT district.name
                            FROM district
                            WHERE district.district_id = post.district_id
                        )`), 'district_name'],
                    ]
                },
                order: [
                    ['post_date', 'DESC']
                ],
                limit: n,
            });
            let result = [];
            for (let i = 0; i < posts.length; i++) {
                let hold = posts[i]['dataValues'];
                result.push(hold);
            }
            return result;
        }
        catch (err) {
            throw new Error(405, err.message);
        }
    }

    async getMostCommentPosts(n) {
        try {
            let posts = await Post.findAll({
                attributes: {
                    include: [
                        [sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM vote
                            WHERE vote.post_id = post.post_id AND vote.type = true
                        )`), 'upvote'],
                        [sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM vote
                            WHERE vote.post_id = post.post_id AND vote.type = false
                        )`), 'downvote'],
                        [sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM comment
                            WHERE comment.post_id = post.post_id
                        )`), 'n_comment'],
                        [sequelize.literal(`(
                            SELECT name
                            FROM "user"
                            WHERE "user".user_id = post.user_id
                        )`), 'user_name'],
                        [sequelize.literal(`(
                            SELECT district.name
                            FROM district
                            WHERE district.district_id = post.district_id
                        )`), 'district_name'],
                    ]
                },
                order: [
                    [sequelize.literal('n_comment'), 'DESC']
                ]
            });
            let result = [];
            for (let i = 0; i < posts.length; i++) {
                let hold = posts[i]['dataValues'];
                result.push(hold);
            }
            return result;
        }
        catch (err) {
            throw new Error(405, err.message);
        }
    }

    async getMostVotePosts(n) {
        try {
            let posts = await Post.findAll({
                attributes: {
                    include: [
                        [sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM vote
                            WHERE vote.post_id = post.post_id AND vote.type = true
                        )`), 'upvote'],
                        [sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM vote
                            WHERE vote.post_id = post.post_id AND vote.type = false
                        )`), 'downvote'],
                        [sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM comment
                            WHERE comment.post_id = post.post_id
                        )`), 'n_comment'],
                        [sequelize.literal(`(
                            SELECT name
                            FROM "user"
                            WHERE "user".user_id = post.user_id
                        )`), 'user_name'],
                        [sequelize.literal(`(
                            SELECT district.name
                            FROM district
                            WHERE district.district_id = post.district_id
                        )`), 'district_name'],
                    ]
                },
                order: [
                    [sequelize.literal('upvote'), 'DESC'],
                    [sequelize.literal('downvote'), 'ASC'],
                ],
                limit: n,
            });
            let result = [];
            for (let i = 0; i < posts.length; i++) {
                let hold = posts[i]['dataValues'];
                result.push(hold);
            }
            return result;
        }
        catch (err) {
            throw new Error(405, err.message);
        }
    }

    async getPostByTag(tag) {
        try {
            let posts = await Post.findAll({
                include: [{
                    model: PostTag,
                    require: true,
                    include: [{
                        model: Tag,
                        require: true,
                        where: {
                            name: tag
                        }
                    }]
                }]
            });
            return posts;
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async getPostByDistrict(district) {
        try {
            let posts = await Post.findAll({
                include: [{
                    model: District,
                    require: true,
                    where: {
                        name: district
                    }
                }]
            });
            return posts;
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async getPostByTagDistrict(tag, district) {
        try {
            let posts = await Post.findAll({
                include: [
                    {
                        model: PostTag,
                        require: true,
                        include: [{
                            model: Tag,
                            require: true,
                            where: {
                                name: tag
                            }
                        }]
                    },
                    {
                        model: District,
                        require: true,
                        where: {
                            name: district
                        }
                    }
                ]
            });
            return posts;
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

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
            let post = await Post.count({
                where: {
                    post_id: id
                }
            });
            return (post > 0);
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }
}

module.exports = PostRepo;