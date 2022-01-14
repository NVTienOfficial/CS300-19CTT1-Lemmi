const { Op } = require("sequelize");
const Tag = require("../models/tag");
const PostTag = require("../models/post_tag");
const Error = require("../config/error");
const sequelize = require("../config/database");

class TagRepo {
    async createOne(id, name) {
        try {
            const newTag = await Tag.create({
                tag_id: id,
                name: name,
            });
            return newTag;
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async createPostTag(post_id, tag_id) {
        try {
            const newPostTag = await PostTag.create({
                tag_id: tag_id,
                post_id: post_id
            });
            return newPostTag['dataValues'];
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async getTagIDByPostID(post_id) {
        try {
            const tag_id = await PostTag.findAll({
                include: [
                    {
                        model: Tag,
                        required: true,
                        where: {
                            type: {
                                [Op.ne]: 'Tên quán'
                            }
                        }
                    }
                ],
                where: {
                    post_id: post_id
                }
            });
            let result = [];
            for (let i = 0; i < tag_id.length; i++) {
                result.push(tag_id[i]['dataValues']['tag_id']);
            }
            return result;
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async deletePostTag(post_id, tag_id) {
        try {
            await PostTag.destroy({
                where: {
                    post_id: post_id,
                    tag_id: tag_id
                }
            });
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async insertPostTag(post_id, tag_name) {
        try {
            console.log(tag_name);
            const tag = await Tag.findOne({
                attributes: ['tag_id'],
                where: {
                    name: tag_name
                }
            });
            const tag_id = tag['tag_id'];
            console.log(tag_id);
            const exist = await PostTag.findOne({
                where: {
                    post_id: post_id,
                    tag_id: tag_id
                }
            });
            console.log(exist);
            if (!exist) {
                console.log("create")
                const newPostTag = await PostTag.create({
                    post_id: post_id,
                    tag_id: tag_id
                });
            }
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async getAll() {
        try {
            const tags = await Tag.findAll();
            return tags;
        }
        catch (err) {
            throw new Error(404, err.message);
        }
    }

    async getIDByName(name) {
        try {
            const tag = await Tag.findOne({
                attributes: ['tag_id'],
                where: {
                    name: name
                }
            });
            return tag['tag_id'];
        }
        catch (err) {
            throw new Error(404, err.message);
        }
    }

    async getAllName() {
        try {
            const tags = await Tag.findAll({
                attributes: ['name']
            });
            let name = [];
            for (let i = 0; i < tags.length; i++) {
                name.push(tags[i]['name'])
            }
            return name;
        }
        catch (err) {
            throw new Error(404, err.message);
        }
    }

    async getTagPlaceByPostID(post_id) {
        try {
            const tag = await Tag.findOne({
                include: [
                    {
                        model: PostTag,
                        require: true,
                        where: {
                            post_id: post_id
                        }
                    }
                ],
                where: {
                    type: {
                        [Op.eq]: 'Tên quán'
                    }
                }
            });
            if (!tag)
                return undefined;
            return tag['name'];
        }
        catch (err) {
            throw new Error(404, err.message);
        }
    }

    async getTagByPostID(post_id) {
        try {
            const tags = await Tag.findAll({
                include: [
                    {
                        model: PostTag,
                        require: true,
                        where: {
                            post_id: post_id
                        }
                    }
                ],
                where: {
                    type: {
                        [Op.ne]: 'Tên quán'
                    }
                }
            });
            let result = [];
            for (let i = 0; i < tags.length; i++) {
                result.push(tags[i]["dataValues"]["name"]);
            }
            return result;
        }
        catch (err) {
            throw new Error(404, err.message);
        }
    }

    async getPostIDByTag(tag) {
        try {
            const tags = await PostTag.findAll({
                include: [
                    {
                        model: Tag,
                        required: true,
                        where: {
                            name: tag
                        }
                    }
                ]
            });
            let post_id = [];
            for (let i = 0; i < tags.length; i++) {
                post_id.push(tags[i]["dataValues"]["post_id"]);
            }
            return post_id;
        }
        catch (err) {
            throw new Error(404, err.message);
        }   
    }

    async getAllNameExcept(type) {
        try {
            const tags = await Tag.findAll({
                attributes: ['name'],
                where: {
                    type: {
                        [Op.ne]: type
                    }
                }
            });
            let name = [];
            for (let i = 0; i < tags.length; i++) {
                name.push(tags[i]['name'])
            }
            return name;
        }
        catch (err) {
            throw new Error(404, err.message);
        }
    }

    async getAllType() {
        try {
            const tags = await Tag.findAll({
                attributes: [
                    [sequelize.fn('DISTINCT', sequelize.col('type')), 'type']
                ]
            });
            let name = [];
            for (let i = 0; i < tags.length; i++) {
                name.push(tags[i]['type'])
            }
            return name;
        }
        catch (err) {
            throw new Error(404, err.message);
        }
    }

    async deleteByName(name) {
        try {
            await Tag.destroy({
                where: {
                    name: name
                }
            });
        }
        catch (err) {
            throw new Error(404, err.message);
        }
    }

    async getTagByPost(id) {
        try {
            const tags = await Tag.findAll({
                include: [{
                    model: PostTag,
                    require: true,
                    where: {
                        post_id: id
                    }
                }],
            });
            let results = [];
            for (let i = 0; i < tags.length; i++) {
                let result = tags[i]['dataValues'];
                results.push(result);
            }
            return results;
        }
        catch (err) {
            throw new Error(404, err.message);
        }
    }

    async deleteByID(id) {
        try {
            await Tag.destroy({
                where: {
                    tag_id: id
                }
            });
        }
        catch (err) {
            throw new Error(405, err.message);
        }
    }

    async updateByID(id, newName) {
        try {
            await Tag.update({name: newName}, {
                where: {
                    tag_id: id 
                }
            });
        }
        catch (err) {
            throw new Error(405, err.message);
        }
    }

    async count() {
        try {
            let n = await Tag.count();
            return n;
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async findByID(id) {
        try {
            let tag = await Tag.findOne({
                where: {
                    tag_id: id
                }
            })
            return tag;
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }

    async isExistID(id) {
        try {
            let tag = await Tag.findOne({
                where: {
                    tag_id: id
                }
            })
            return !(!tag);
        }
        catch (err) {
            throw new Error(500, err.message);
        }
    }
}

module.exports = TagRepo;