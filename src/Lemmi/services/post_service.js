const PostRepo = require("../repos/post_repo");
const UserRepo = require("../repos/user_repo");
const VoteRepo = require("../repos/vote_repo");
const CommentRepo = require("../repos/comment_repo");
const DistrictRepo = require("../repos/district_repo");
const TagRepo = require("../repos/tag_repo");
const ImageService = require("../services/image_service");
const Error = require("../config/error");

const rPost = new PostRepo();
const rUser = new UserRepo();
const rComment = new CommentRepo();
const rTag = new TagRepo();
const sImage = new ImageService();

class PostService {
    async createPost(post) {
        const {title, content, star, report, user_id, post_date, district_id, image} = post;

        if (!title || !content || !star || star < 0) {
            throw new Error(400, "Bad request");
        }

        if (report & report < 0)
            throw new Error(400, "Bad request");

        if (user_id && user_id != "") {
            let existUser = await rUser.isExistID(user_id);
            if (!existUser)
                throw new Error(400, "Bad request");
        }

        try {
            let id = await this.generateNewID();
            let postData = post;
            postData["post_id"] = id;
            delete postData["image"];
            const newPost = await rPost.createOne(postData);
            const images = await sImage.createImages(image, user_id, id);
            newPost["image"] = image;
            return newPost;
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async getAllPosts() {
        try {
            const posts = await rPost.getAll();
            return posts;
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async filter(tag, district) {
        if (!tag && !district)
            return undefined;

        try {
            if (!tag) {
                const posts = await rPost.getPostByDistrict(district);
                return posts;
            }
            else if (!district) {
                const posts = await rPost.getPostByTag(tag);
                return posts;
            }
            else {
                const posts = await rPost.getPostByTagDistrict(tag, district);
                return posts;
            }
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async filterUser(tag, district, user_id) {
        if (!user_id)
            return undefined;
    }

    async getNewestPosts(n) {
        try {
            let posts = await rPost.getNewestPosts(n);
            for (let i = 0; i < posts.length; i++) {
                posts[i]['comment'] = await rComment.getCommentByPost(posts[i]['post_id']);
                posts[i]['tag'] = await rTag.getTagByPost(posts[i]['post_id']);
                posts[i]['name'] = "";
                posts[i]['image'] = undefined;
                let tags = posts[i]['tag'];
                if (tags != undefined) {
                    for (let j = 0; j < tags.length; j++) {
                        if (tags[j]['type'] == "Tên quán") {
                            posts[i]['name'] = tags[j]['name']
                        }
                    }
                }
            }
            return posts;
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async getMostCommentPosts(n) {
        try {
            let posts = await rPost.getMostCommentPosts(n);
            for (let i = 0; i < posts.length; i++) {
                posts[i]['comment'] = await rComment.getCommentByPost(posts[i]['post_id']); 
                posts[i]['tag'] = await rTag.getTagByPost(posts[i]['post_id']);
                posts[i]['name'] = "";
                posts[i]['image'] = undefined;
                let tags = posts[i]['tag'];
                if (tags != undefined) {
                    for (let j = 0; j < tags.length; j++) {
                        if (tags[j]['type'] == "Tên quán") {
                            posts[i]['name'] = tags[j]['name']
                        }
                    }
                }
            }
            return posts;
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async getMostVotePost(n) {
        try {
            let posts = await rPost.getMostVotePosts(n);
            for (let i = 0; i < posts.length; i++) {
                posts[i]['comment'] = await rComment.getCommentByPost(posts[i]['post_id']); 
                posts[i]['tag'] = await rTag.getTagByPost(posts[i]['post_id']);
                posts[i]['name'] = "";
                posts[i]['image'] = undefined;
                let tags = posts[i]['tag'];
                if (tags != undefined) {
                    for (let j = 0; j < tags.length; j++) {
                        if (tags[j]['type'] == "Tên quán") {
                            posts[i]['name'] = tags[j]['name']
                        }
                    }
                }
            }
            return posts;
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async getAllPostsByUser(id) {
        if (!id || id == "")
            throw new Error(400, "Bad request");
            
        try {
            const posts = await rPost.getAllByUserID(id);
            return posts;
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async getPostsByID(id) {
        if (id.length == 0)
            return [];
        
        try {
            let posts = [];
            for (let i = 0; i < id.length; i++) {
                const post = await rPost.findByID(id[i]);
                posts.push(post);
            }
            return posts;
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async getPostByID(id) {
        if (id.length == 0)
            throw new Error(400, "Bad request");
        
        try {
            const post = await rPost.findByID(id);
            return post;
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async deletePostByID(id) {
        if (!id || id == "")
            throw new Error(400, "Bad request");

        try {
            await rPost.deleteByID(id);
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async deletePostByUser(id) {
        if (!id || id == "")
            throw new Error(400, "Bad request");

        try {
            await rPost.deleteByUserID(id);
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async generateNewID() {
        let id = await rPost.count();
        let post_id = await this.toStringID(id);
        const max_id = Math.pow(16,8) - 1;

        while (true) {
            let exist = await rPost.isExistID(post_id);
            if (exist) {
                id = ( (id % max_id ) + 8) % max_id;
                post_id = await this.toStringID(id);
            }
            else
                break;
        }
        return post_id;
    }

    async toStringID(id) {
        let str = id.toString(16);
        while (str.length < 8)
            str = '0' + str;
        return str;
    }
}

module.exports = PostService;