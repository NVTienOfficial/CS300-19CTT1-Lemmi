const AccountRepo = require("../repos/account_repo");
const Error = require("../config/error");
const generateToken = require("../middleware/token");
const Account = require("../models/account");

const rAccount = new AccountRepo();

class AccountService {
    async signUp(account) {
        const { username, password, type } = account;

        if (!username || !password || !type || username === "" || password === "")
            throw new Error(400, "Bad request");
            
        try {
            let id = await this.generateNewID();
            const account = await rAccount.CreateAccount(id, username, password, type);
            return account;
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async login(account) {
        const { username, password } = account;

        if (!username || !password || username === "" || password === "")
            return new Error(400, "Bad request");

        try {
            const result = await rAccount.findAccountByUsername(username);

            if (result === null)
                throw new Error(404, "Not found");

            if (result.password === password) {
                return generateToken({
                    account_id: result.account_id,
                    type: result.type
                })
            }
            else {
                throw new Error(400, "Invalid credential");
            }
        }
        catch (err) {
            if (err.statusCode == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async getAllAccounts(account) {
        const { account_id, type } = account;

        if (!account_id || !type || account_id === "" || type === "")
            return new Error(400, "Bad request");

        if (type != "admin") {
            return new Error(401, "Invalid token")
        }

        try {
            let accounts = await rAccount.getAll();
            return accounts;
        }
        catch (err) {
            if (err.statusCode == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async deleteAccountByID(id) {
        try {
            await rAccount.deleteByID(id);
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async deleteAccountByUsername(username) {
        try {
            await rAccount.deleteByUsername(username);
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async generateNewID() {
        let id = await rAccount.count();
        let acc_id = await this.toStringID(id);
        const max_id = Math.pow(16,5) - 1;

        while (true) {
            let exist = await rAccount.isExistID(acc_id);

            if (exist) {
                id = ( (id % max_id ) + 8) % max_id;
                acc_id = await this.toStringID(id);
            }
            else
                break;
        }
        
        return acc_id;
    }

    async toStringID(id) {
        let str = id.toString(16);
        while (str.length < 5)
            str = '0' + str;
        return str;
    }
}

module.exports = AccountService;