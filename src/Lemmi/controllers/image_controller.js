const router = require("express").Router();

const ImageService = require("../services/image_service");

const sImage = new ImageService();

router.post("/create", async (req, res) => {
    try {
        let image = await sImage.createImage(req.body);
        return res.status(201).json({
            status: "OK",
            message: "success",
            data: image,
        })
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

router.get("", async (req, res) => {
    try {
        let images = await sImage.getAllImages();
        return res.status(200).json({
            status: "OK",
            message: "success",
            data: images,
        })
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

router.get("/all", async (req, res) => {
    try {
        let images = await sImage.getAllImagesByUserID(req.query.id);
        return res.status(200).json({
            status: "OK",
            message: "success",
            data: images,
        })
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

router.delete("", async (req, res) => {
    try {
        await sImage.deleteImageByID(req.query.id);
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