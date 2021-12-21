const Account = require("../models/account");

class AccountRepo {
    async CreateAccount(account) {
        const newAccount = await Account.create(account);
        return newAccount;
    }

    async findByUsername(username) {
        try {
            const account = await Account.findOne({
                where: {
                    username: username
                }
            })
            return account;
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async findByIDUsername(id, username) {
        try {
            const account = await Account.findOne({
                where: {
                    account_id: id,
                    username: username
                }
            })
            return account;
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async getAll() {
        try {
            const accounts = await Account.findAll();
            return accounts;
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async getAllUsername() {
        try {
            const usernames = await Account.findAll({
                attributes: ['username']
            });
            let name = [];
            for (let i = 0; i < usernames.length; i++) {
                name.push(usernames[i]['username'])
            }
            return name;
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async deleteByID(id) {
        try {
            await Account.destroy({
                where: {
                    account_id: id
                }
            });
        }
        catch (err) {
            throw new Error(404, err.message);
        }
    }

    async deleteByUsername(username) {
        try {
            await Account.destroy({
                where: {
                    username: username
                }
            });
        }
        catch (err) {
            throw new Error(404, err.message);
        }
    }

    async updatePassword(id, pwd) {
        try {
            await Account.update(
                {password: pwd},
                {
                    where: {account_id: id}
                }
            );
        }
        catch (err) {
            throw new Error(404, err.message);
        }
    }

    async count() {
        try {
            let n = await Account.count();
            return n;
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async findByID(id) {
        try {
            let account = Account.findOne({
                where: {
                    account_id: id
                }
            })
            return account;
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async isExistID(id) {
        try {
            let account = await Account.count({
                where: {
                    account_id: id
                }
            });
            return (account > 0);
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }
}

module.exports = AccountRepo;