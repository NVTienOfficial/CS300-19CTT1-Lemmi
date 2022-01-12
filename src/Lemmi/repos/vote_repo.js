const sequelize = require("../config/database");
const Vote = require("../models/vote");

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

    async getUserIDByPostID(id) {
        try {
            const user_id_up = await Vote.findAll({
                attributes: ['user_id'],
                where: {
                    post_id: id,
                    type: true,
                }
            });
            const user_id_down = await Vote.findAll({
                attributes: ['user_id'],
                where: {
                    post_id: id,
                    type: false,
                }
            });
            let up = [];
            for (let i = 0; i < user_id_up.length; i++) {
                up.push(user_id_up[i]["dataValues"]["user_id"]);
            }
            let down = [];
            for (let i = 0; i < user_id_down.length; i++) {
                down.push(user_id_down[i]["dataValues"]["user_id"]);
            }
            let user_vote = {
                up: up,
                down: down
            }
            return user_vote;
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