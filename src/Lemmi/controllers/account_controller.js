const router = require("express").Router();
const auth = require("../middleware/auth");

const AccountService = require("../services/account_service");
const UserService = require("../services/user_service");

const sAccount = new AccountService();

router.post("/create", async (req, res) => {
    try {
        let account = await sAccount.signUp(req.body);
        return res.status(200).json({
            status: "OK",
            message: "success",
            account: account,
        });
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

router.post("/login", async (req, res) => {
    try {
        let token = await sAccount.login(req.body);
        return res.status(200).json({
            status: "OK",
            message: "success",
            token: token
        })
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

router.get("", auth, async (req, res) => {
    try {
        let accounts = await sAccount.getAllAccounts(req.account);
        return res.status(200).json({
            status: "OK",
            message: "success",
            data: accounts
        })
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

router.delete("", async (req, res) => {
    try {
        await sAccount.deleteAccountByID(req.query.id);
        return res.status(200).json({
            status: "OK",
            message: "success",
        })
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

router.delete("/del", async (req, res) => {
    try {
        await sAccount.deleteAccountByUsername(req.query.username);
        return res.status(200).json({
            status: "OK",
            message: "success",
        })
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

module.exports = router;