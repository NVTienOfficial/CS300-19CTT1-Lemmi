const router = require("express").Router();

const UserService = require("../service/user_service");

const userService = new UserService();

router.post("/create", async (req, res) => {
    try {
        user = await userService.CreateAnUser(req.body);
        return res.status(200).json({
            status: "OK",
        });
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

module.exports = router;