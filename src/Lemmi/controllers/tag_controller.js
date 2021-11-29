const router = require("express").Router();

const TagService = require("../services/tag_service");

const sTag = new TagService();

router.post("/create", async (req, res) => {
    try {
        let tag = await sTag.createTag(req.body);
        return res.status(201).json({
            status: "OK",
            message: "success",
            data: tag,
        })
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

router.get("", async (req, res) => {
    try {
        let tags = await sTag.getAllTags();
        return res.status(200).json({
            status: "OK",
            message: "success",
            data: tags,
        })
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

router.get("/all", async (req, res) => {
    try {
        let tags = await sTag.getAllTagNames();
        return res.status(200).json({
            status: "OK",
            message: "success",
            data: tags,
        })
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

router.put("", async (req, res) => {
    try {
        await sTag.updateTagByID(req.body);
        return res.status(200).json({
            status: "OK",
            message: "success",
        })
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

router.delete("", async (req, res) => {
    try {
        await sTag.deleteTagByID(req.query.id);
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