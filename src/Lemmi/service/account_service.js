const AccountRepo = require("../repo/account_repo");
const Error = require("../model/error");

const accountRepo = new AccountRepo();

class AccountService {
    async SignUp(account) {
        const { user_id, username, password, category } = account;
        if (!username || !password)
            throw new Error("Bad request", 400);
        try {
            const account = await accountRepo.CreateAnAccount(
                user_id,
                username,
                password,
                category
            );
            return account;
        }
        catch (err) {
            if (err.statusCode == null)
                throw new Error(err, 500);
            throw new Error(err.message, err.statusCode);
        }
    }
}

module.exports = AccountService;