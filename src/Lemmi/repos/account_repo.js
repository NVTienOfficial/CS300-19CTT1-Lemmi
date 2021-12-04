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
}

module.exports = AccountRepo;