const ImageRepo = require("../repos/image_repo");
const Error = require("../config/error");

const rImage = new ImageRepo();

class ImageService {
    async createImage(image) {
        const { src, user_id } = image;

        if (!src || src == "")
            throw new Error(400, "Bad request");
        
        try {
            const id = await this.generateNewID();
            console.log(id);
            const createdImage = await rImage.createOne(id, src, user_id);
            return createdImage;
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async createImages(image, user_id, post_id) {
        try {
            let images = []
            for (let i = 0; i < image.length; i++) {
                const id = await this.generateNewID();
                const createdImage = await rImage.createOne(id, image[i], user_id, post_id);
                images.push(createdImage);
            }
            return images;
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async updatePostImage(user_id, post_id, images) {
        try {
            await rImage.deletePostImages(post_id);
            const post_images = await this.createImages(images, user_id, post_id);
            return post_images;
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async getAllImages() {
        try {
            const images = await rImage.getAll();
            return images;
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async getAllImagesByUserID(user_id) {
        try {
            const images = await rImage.getAllByUserID(user_id);
            return images;
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async getAllImagesByPostID(post_id) {
        try {
            const images = await rImage.getAllByPostID(post_id);
            return images;
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async deleteImageByID(id) {
        try {
            await rImage.deleteByID(id);
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async generateNewID() {
        let id = await rImage.count();
        let img_id = await this.toStringID(id);
        const max_id = Math.pow(16,8) - 1;

        while (true) {
            let exist = await rImage.isExistID(img_id);
            console.log(exist);

            if (exist) {
                id = ( (id % max_id ) + 8) % max_id;
                img_id = await this.toStringID(id);
            }
            else
                break;
        }
        
        return img_id;
    }

    async toStringID(id) {
        let str = id.toString(16);
        while (str.length < 8)
            str = '0' + str;
        return str;
    }
}

module.exports = ImageService;