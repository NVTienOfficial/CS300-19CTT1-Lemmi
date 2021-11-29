const TagRepo = require("../repos/tag_repo");
const Error = require("../config/error");

const rTag = new TagRepo();

class TagService {
    async createTag(tag) {
        const { name } = tag;

        if (!name || name == "")
            throw new Error(400, "Bad request");
        
        try {
            const createdTag = await rTag.createOne(name);
            return createdTag;
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async getAllTags() {
        try {
            const tags = await rTag.getAll();
            return tags;
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async getAllTagNames() {
        try {
            const names = await rTag.getAllName();
            return names;
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async updateTagByID(tag) {
        const { tag_id, name } = tag;

        if (!tag_id || !name || name == "")
            throw new Error(400, "Bad request");

        try {
            await rTag.updateByID(tag_id, name);
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async deleteTagByID(id) {
        try {
            await rTag.deleteByID(id);
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }
}

module.exports = TagService;