const Tag = require("../models/tag");
const Error = require("../config/error");

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

    async getAll() {
        try {
            const tags = await Tag.findAll();
            return tags;
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