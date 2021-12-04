const router = require("express").Router();

const UserService = require("../services/user_service");
const auth = require("../middleware/auth");

const sUser = new UserService();

router.post("/create", async (req, res) => {
    try {
        user = await sUser.CreateAnUser(req.body);
        return res.status(200).json({
            status: "OK",
            message: "success",
            data: user
        });
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

module.exports = router;