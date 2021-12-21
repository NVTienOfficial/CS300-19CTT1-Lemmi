const sequelize = require("../config/database");
const Vote = require("../models/vote");
const Sequelize = require("sequelize");

class VoteRepo {
    async createOne(vote) {
        try {
            const newVote = await Vote.create(vote);
            return newVote;
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async deleteOne(user_id, post_id) {
        try {
            await Vote.destroy({
                where: {
                    user_id: user_id,
                    post_id: post_id
                }
            });
        }
        catch (err) {
            throw new Error(405, err.message);
        }
    }

    async updateOne(user_id, post_id, type) {
        try {
            await Vote.update(
                {type: type},
                {
                    where: {
                        user_id: user_id,
                        post_id: post_id,
                    }
                }
            )
        }
        catch (err) {
            throw new Error(405, err.message);
        }
    }

    async countUpvoteByPost(post_id) {
        try {
            let n = await Vote.count({
                where: {
                    post_id: post_id,
                    type: true,
                }
            });
            return n;
        }
        catch (err) {
            throw new Error(405, err.message);
        }
    }

    async countDownvoteByPost(post_id) {
        try {
            let n = await Vote.count({
                where: {
                    post_id: post_id,
                    type: false,
                }
            });
            return n;
        }
        catch (err) {
            throw new Error(405, err.message);
        }
    }

    async getPopularPosts(n) {
        try {
            const votes = await Vote.findAll({
                attributes: [
                        [sequelize.fn('DISTINCT', sequelize.col('post_id')), 'post_id'],
                        [sequelize.literal(`(
                            SELECT COUNT(*) 
                            FROM vote AS v
                            WHERE v.type=1 and v.post_id = vote.post_id
                        )`), 'upvote'],
                        [sequelize.literal(`(
                            SELECT COUNT(*) 
                            FROM vote AS v 
                            WHERE v.type=-1 and v.post_id = vote.post_id
                        )`), 'downvote']
                ],
                order: [
                    [sequelize.literal('upvote'), 'DESC'],
                    [sequelize.literal('downvote'), 'ASC'],
                ],
                limit: n,
            });
            let post_id = [];
            for (let i = 0; i < votes.length; i++) {
                post_id.push(votes[i]["post_id"]);
            }
            return post_id;
        }
        catch (err) {
            throw new Error(405, err.message);
        }
    }
    
    async count() {
        try {
            let n = await Vote.count();
            return n;
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async isExistVote(user_id, post_id) {
        try {
            let vote = await Vote.count({
                where: {
                    user_id: user_id,
                    post_id: post_id,
                }
            });
            return (vote > 0);
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }
}

module.exports = VoteRepo;