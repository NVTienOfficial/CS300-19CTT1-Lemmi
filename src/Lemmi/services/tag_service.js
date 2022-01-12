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

    async createPostTags(post_id, tags) {
        try {
            let post_tag = [];
            for (let i = 0; i < tags.length; i++) {
                const tag_id = await rTag.getIDByName(tags[i]);
                const pt = await rTag.createPostTag(post_id, tag_id);
                post_tag.push(pt);
            }
            return post_tag;
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async updatePostTag(post_id, tags) {
        if (tags?.length)
            return;

        try {
            for (let i = 0; i < tags.length; i++) {
                await rTag.insertPostTag(post_id, tags[i]);
            }
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

    async getTagNameByPost(id) {
        try {
            const names = await rTag.getTagByPostID(id);
            return names;
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async getAllTagNamesExcept(name) {
        try {
            const names = await rTag.getAllNameExcept(name);
            return names;
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async getAllTagCategory() {
        try {
            const types = await rTag.getAllType();
            return types;
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

    async generateNewID() {
        let id = await rTag.count();
        let tag_id = await this.toStringID(id);
        const max_id = Math.pow(16,3) - 1;

        while (true) {
            let exist = await rTag.isExistID(tag_id);

            if (exist) {
                id = ( (id % max_id ) + 8) % max_id;
                tag_id = await this.toStringID(id);
            }
            else
                break;
        }
        
        return tag_id;
    }

    async toStringID(id) {
        let str = id.toString(16);
        while (str.length < 3)
            str = '0' + str;
        return str;
    }
}

module.exports = TagService;