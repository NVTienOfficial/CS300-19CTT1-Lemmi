const Image = require("../models/image");
const Error = require("../config/error");

class ImageRepo {
    async createOne(id, src, user_id) {
        if (!id || !src || !user_id || src === "")
            throw new Error(400, "Bad request");

        try {;
            const newImg = await Image.create({
                image_id: id,
                src: src,
                user_id: user_id,
            });
            return newImg;
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async getAll() {
        try {
            const images = await Image.findAll();
            return images;
        }
        catch (err) {
            throw new Error(404, err.message);
        }
    }

    async getAllByUserID(user_id) {
        try {
            const images = await Image.findAll({
                where: {
                    user_id: user_id
                }
            })
            return images;
        }
        catch (err) {
            throw new Error(404, err.message);
        }
    }

    async deleteByID(id) {
        try {
            await District.destroy({
                where: {
                    image_id: id
                }
            });
        }
        catch (err) {
            throw new Error(404, err.message);
        }
    }

    async count() {
        try {
            let n = await Image.count();
            return n;
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async getByID(id) {
        try {
            let image = await Image.findOne({
                where: {
                    image_id: id
                }
            })
            return image;
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async isExistID(id) {
        try {
            let image = await Image.findOne({
                where: {
                    image_id: id
                }
            })
            return !(!image);
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }
}

module.exports = ImageRepo;