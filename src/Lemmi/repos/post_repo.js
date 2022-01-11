const sequelize = require("../config/database");
const District = require("../models/district");
const Post = require("../models/post");
const Tag = require("../models/tag");
const PostTag = require("../models/post_tag");
const PostImage = require("../models/post_image");

class PostRepo {
    async createOne(post) {
        try {
            const newPost = await Post.create(post);
            return newPost["dataValues"];
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async updateTitle(title, post_id) {
        try {
            await Post.update({title: title}, {
                where: {
                    post_id: post_id
                }
            });
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async updateContent(content, post_id) {
        try {
            await Post.update({content: content}, {
                where: {
                    post_id: post_id
                }
            });
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async updateStar(star, post_id) {
        try {
            await Post.update({star: star}, {
                where: {
                    post_id: post_id
                }
            });
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async updateDistrict(district_id, post_id) {
        try {
            await Post.update({district_id: district_id}, {
                where: {
                    post_id: post_id
                }
            });
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

    async getUserPostByTag(tag, user_id) {
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
                }],
                where: {
                    user_id: user_id
                }
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

    async getUserPostByDistrict(district, user_id) {
        try {
            let posts = await Post.findAll({
                include: [{
                    model: District,
                    require: true,
                    where: {
                        name: district
                    }
                }],
                where: {
                    user_id: user_id
                }
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

    async getUserPostByTagDistrict(tag, district, user_id) {
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
                ],
                where: {
                    user_id: user_id
                }
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
            let post = await Post.findOne({
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
                where: {
                    post_id: id
                }
            })
            return post['dataValues'];
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