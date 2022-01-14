const Image = require("../models/image");
const PostImage = require("../models/post_image");
const Error = require("../config/error");
const sequelize = require("../config/database");

class ImageRepo {
    async createOne(id, src, user_id, post_id) {
        if (!id || !src || !user_id || src === "")
            throw new Error(400, "Bad request");

        try {
            const newImg = await Image.create({
                image_id: id,
                src: src,
                user_id: user_id,
            });
            const ImgPost = await PostImage.create({
                post_id: post_id,
                image_id: id
            });
            return newImg['dataValues'];
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

    async getAllByPostID(post_id) {
        try {
            const images = await PostImage.findAll({
                attributes: {
                    include: [
                        [sequelize.literal(`(
                            SELECT image.src
                            FROM image
                            WHERE post_image.image_id = image_id
                        )`), 'path']
                    ]
                },
                where: {
                    post_id: post_id
                }
            });
            let path = [];
            for (let i = 0; i < images.length; i++) {
                path.push(images[i]['dataValues']['path']);
            }
            return path;
        }
        catch (err) {
            throw new Error(404, err.message);
        }
    }

    async deleteByID(id) {
        try {
            await Image.destroy({
                where: {
                    image_id: id
                }
            });
        }
        catch (err) {
            throw new Error(404, err.message);
        }
    }

    async deletePostImages(post_id) {
        try {
            await PostImage.destroy({
                where: {
                    post_id: post_id
                }
            });
        }
        catch (err) {
            throw new Error(404, err.message);
        }
    }

    async getAllPostImagesByPostID(post_id) {
        try {
            const post_images = await PostImage.findAll({
                attributes: {
                    include: [
                        [sequelize.literal(`(
                            SELECT image.user_id
                            FROM image
                            WHERE image.image_id = post_image.image_id
                        )`), 'user_id']
                    ]
                },
                where: {
                    post_id: post_id
                }
            })
            let result = [];
            for (let i = 0; i < post_images.length; i++) {
                result.push(post_images[i]['dataValues']);
            }
            return result;
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