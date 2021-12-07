const Vote = require("../models/vote");

class VoteRepo {
    
    async count() {
        try {
            let n = await Vote.count();
            return n;
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }
}

module.exports = VoteRepo;