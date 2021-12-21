const router = require("express").Router();

const VoteService = require("../services/vote_service");

const sVote = new VoteService();

router.post("", async (req, res) => {
    try {
        const vote = await sVote.makeVote(req.body);
        return res.status(201).json({
            status: "OK",
            message: "Success",
            data: vote,
        });
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

router.put("", async (req, res) => {
    try {
        const vote = await sVote.updateVote(req.body);
        return res.status(201).json({
            status: "OK",
            message: "Success",
            data: vote,
        });
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

router.delete("", async (req, res) => {
    try {
        await sVote.reVote(req.body);
        return res.status(201).json({
            status: "OK",
            message: "Success",
        });
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

router.get("", async (req, res) => {
    try {
        const vote = await sVote.getPostVote(req.query.id);
        return res.status(201).json({
            status: "OK",
            message: "Success",
            data: vote,
        });
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

module.exports = router;