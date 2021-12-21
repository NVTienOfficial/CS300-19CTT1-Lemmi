const UserRepo = require("../repos/user_repo");
const DistrictRepo = require("../repos/district_repo");
const AccountRepo = require("../repos/account_repo");
const Error = require("../config/error");

const rUser = new UserRepo();
const rDistrict = new DistrictRepo();
const rAccount = new AccountRepo();

class UserService {
    async createUser(user) {
        const {user_id, firstName, lastName, name, description, dob, gender, phone, address, email, district_id} = user;
        
        if (!user_id || !firstName || !lastName || !gender)
            throw new Error(400, "Bad request");
        let existAccount = await rAccount.isExistID(user_id);
        let existUser = await rUser.isExistID(user_id);
        if (!existAccount || (existAccount && existUser))
            throw new Error(401, "Account does not exist or already has user");
        
        if (district_id) {
            console.log(district_id);
            let existDistrict = await rDistrict.isExistID(district_id);
            if (!existDistrict)
                throw new Error(400, "Bad request");
        }

        try {
            console.log("hello");
            const newUser = await rUser.createOne(user);
            return newUser;
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async createOwner(owner) {
        const {user_id, name, description, dob, phone, address, email, district_id} = owner;

        if (!user_id || !name || !phone || !address)
            throw new Error(400, "Bad request");

        if (district_id && district_id != "") {
            let existDistrict = await rDistrict.isExistID(district_id);
            if (!existDistrict)
                throw new Error(400, "Bad request");
        }

        try {
            const owner = await rUser.createUser(owner);
            return owner;
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async getAllUsers() {
        try {
            const users = await rUser.getAll();
            return users;
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }
    
    async deleteUserByID(id) {
        if (!id)
            throw new Error(400, "Bad request");

        try {
            await rUser.deleteByID(id);
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }
}

module.exports = UserService;