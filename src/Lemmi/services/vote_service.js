const VoteRepo = require("../repos/vote_repo");
const UserRepo = require("../repos/user_repo");
const PostRepo = require("../repos/post_repo");
const Error = require("../config/error");

const rVote = new VoteRepo();
const rUser = new UserRepo();
const rPost = new PostRepo();

class VoteService {
    async makeVote(vote) {
        const { user_id, post_id, type } = vote;

        if (!user_id || !post_id || !type)
            throw new Error(400, "Bad request");

        const existUser = await rUser.isExistID(user_id);
        const existPost = await rPost.isExistID(post_id);
        // const existVote = await rVote.isExistVote(user_id, post_id);
        if (!existUser || !existPost)
            throw new Error(400, "Bad request")

        try {
            if (type == "true")
                vote.type = true
            else vote.type = false
            const newVote = await rVote.createOne(vote);
            return newVote;
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async getUserIDVotePost(post_id) {
        try {
            const user_id = await rVote.getUserIDByPostID(post_id);
            return user_id;
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async reVote(vote) {
        const { user_id, post_id } = vote;

        if (!user_id || !post_id)
            throw new Error(400, "Bad request");

        try {
            await rVote.deleteOne(user_id, post_id);
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async updateVote(vote) {
        const { user_id, post_id, type } = vote;

        if (!user_id || !post_id || type == undefined)
            throw new Error(400, "Bad request");

        try {
            const newVote = await rVote.updateOne(user_id, post_id, type);
            return newVote;
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async getPostVote(id) {
        if (!id)
            throw new Error(400, "Bad request");
        
        try {
            const vote = {};
            vote["up"] = await rVote.countUpvoteByPost(id);
            vote["down"] = await rVote.countDownvoteByPost(id);
            return vote;
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }
}

module.exports = VoteService;