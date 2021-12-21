const router = require("express").Router();

const UserService = require("../services/user_service");    

const sUser = new UserService();

router.post("/create", async (req, res) => {
    try {
        const user = await sUser.createUser(req.body);
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

router.get("", async (req, res) => {
    try {
        const users = await sUser.getAllUsers();
        return res.status(200).json({
            status: "OK",
            message: "success",
            data: users,
        });
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

router.delete("", async (req, res) => {
    try {
        await sUser.deleteUserByID(req.query.id);
        return res.status(200).json({
            status: "OK",
            message: "success",
        });
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

module.exports = router;