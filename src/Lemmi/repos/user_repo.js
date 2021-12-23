const User = require("../models/user");

class UserRepo {
    async createOne(user) {
        try {
            console.log(user);
            const newUser = await User.create(user);
            return newUser;
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async deleteByID(id) {
        try {
            await User.destroy({
                where: {
                    user_id: id,
                }
            });
        }
        catch (err) {
            throw new Error(405, err.message);
        }
    }

    async getAll() {
        try {
            const users = await User.findAll();
            return users;
        }
        catch (err) {
            throw new Error(404, err.message);
        }
    }

    async getNameByID(id) {
        try {
            const name = await User.findOne({
                attributes: ['name'],
                where: {
                    user_id: id
                }
            });
            return name['name'];
        }
        catch (err) {
            throw new Error(404, err.message);
        }
    }

    async getDistrictIDByID(id) {
        try {
            const district = await User.findOne({
                attributes: ['district_id'],
                where: {
                    user_id: id
                }
            });
            return district['district_id'];
        }
        catch (err) {
            throw new Error(404, err.message);
        }
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
            let user = await User.findOne({
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

    async findIDByEmail(email) {
        console.log(email);
        try {
            let account = await User.findOne({
                where: {
                    email: email
                }
            })
            if (!account)
                return null;
            return account["user_id"];
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async isExistID(id) {
        try {
            let user = await User.count({
                where: {
                    user_id: id
                }
            });
            return (user > 0);
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }
}

module.exports = UserRepo;