const router = require("express").Router();

const UserService = require("../services/user_service");

const sUser = new UserService();

router.post("/create", async (req, res) => {
    try {
        user = await sUser.CreateAnUser(req.body);
        return res.status(200).json({
            status: "OK",
        });
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

module.exports = router;