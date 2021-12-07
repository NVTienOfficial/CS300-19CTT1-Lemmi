const User = require("../models/user");

class UserRepo {
    async CreateAnUser() {
        
    }

    async count() {
        try {
            let n = await User.count();
            return n;
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async findByID(id) {
        try {
            let user = User.findOne({
                where: {
                    user_id: id
                }
            })
            return user;
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async isExistID(id) {
        try {
            let user = User.findOne({
                where: {
                    user_id: id
                }
            })
            return !(!user)
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }
}

module.exports = UserRepo;