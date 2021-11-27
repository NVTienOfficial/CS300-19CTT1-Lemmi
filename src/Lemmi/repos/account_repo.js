const Account = require("../models/account");

class AccountRepo {
    async CreateAnAccount(user_id, username, password, category) {
        const newAccount = await Account.create({
            user_id: user_id,
            username: username,
            password: password,
            category: category,
        });
        return newAccount;
    }
}

module.exports = AccountRepo;