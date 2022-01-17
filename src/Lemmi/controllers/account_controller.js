const router = require("express").Router();
const auth = require("../middleware/auth");

const AccountService = require("../services/account_service");

const sAccount = new AccountService();

router.post("/create", async (req, res) => {
    try {
        let account = await sAccount.signUp(req.body);
        req.session.userid = account.account_id;
        req.session.username = account.username;
        return res.redirect('/');
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

//Dat
router.get("/create/:type", (req, res) => {
    res.render('register-' + req.params.type);
});



router.get("", async (req, res) => {
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

router.get("/pwd", async (req, res) => {
    try {
        const password = await sAccount.findPassword(req.body);
        return res.status(200).json({
            status: "OK",
            message: "success",
            data: password,
        })
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
    
});

//Dat
router.get('/changepassword', (req, res) => {
    res.render('changepassword');
});

router.get('/forgot', (req, res) => {
    res.render('forgot');
});



router.put("/pwd", async (req, res) => {
    try {
        await sAccount.updatePassword(req.body);
        return res.redirect(req.session.redirectTo || '/');
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

module.exports = router;