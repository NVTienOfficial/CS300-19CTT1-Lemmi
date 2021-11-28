const AccountRepo = require("../repos/account_repo");
const Error = require("../config/error");

const rAccount = new AccountRepo();

class AccountService {
    async SignUp(account) {
        const { user_id, username, password, category } = account;

        if (!username || !password)
            throw new Error(400, "Bad request");
            
        try {
            const account = await rAccount.CreateAnAccount(
                user_id,
                username,
                password,
                category
            );
            return account;
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }
}

module.exports = AccountService;