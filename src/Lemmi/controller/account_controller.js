const router = require("express").Router();

const AccountService = require("../service/account_service");

const accountService = new AccountService();

router.post("/create", async (req, res) => {
    console.log("Account controller");
    try {
        user = await accountService.SignUp(req.body);
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