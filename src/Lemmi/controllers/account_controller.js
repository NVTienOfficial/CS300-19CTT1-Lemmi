const router = require("express").Router();

const AccountService = require("../services/account_service");

const sAccount = new AccountService();

router.post("/create", async (req, res) => {
    try {
        let user = await sAccount.SignUp(req.body);
        return res.status(200).json({
            status: "OK",
            data: user,
        });
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

module.exports = router;