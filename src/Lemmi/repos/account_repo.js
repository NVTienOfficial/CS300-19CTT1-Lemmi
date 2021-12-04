const Account = require("../models/account");

class AccountRepo {
    async CreateAccount(account_id, username, password, type) {
        const newAccount = await Account.create({
            account_id: account_id,
            username: username,
            password: password,
            type: type,
        });
        return newAccount;
    }

    async findAccountByUsername(username) {
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
            let account = Account.findOne({
                where: {
                    account_id: id
                }
            })
            return !(!account)
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }
}

module.exports = AccountRepo;