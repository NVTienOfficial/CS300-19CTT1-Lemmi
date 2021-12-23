const PostRepo = require("../repos/post_repo");
const UserRepo = require("../repos/user_repo");
const VoteRepo = require("../repos/vote_repo");
const CommentRepo = require("../repos/comment_repo");
const DistrictRepo = require("../repos/district_repo");
const TagRepo = require("../repos/tag_repo");
const Error = require("../config/error");

const rPost = new PostRepo();
const rUser = new UserRepo();
const rVote = new VoteRepo();
const rComment = new CommentRepo();
const rDistrict = new DistrictRepo();
const rTag = new TagRepo();

class PostService {
    async createPost(post) {
        const {title, content, star, report, user_id, post_date} = post;

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
            post["post_id"] = id;
            const newPost = await rPost.createOne(post);
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

    async filter(tag, category, district) {
        if (!tag && !category && !district)
            throw new Error(400, "Bad request");

        try {
            if (!category && !district) {
                const posts = await rPost.getPostByTag(tag);
                return posts;
            }
            else if (!tag && !district) {
                const posts = await rPost.getPostByCategory(category);
                return posts;
            }
            else if (!tag && !category) {
                const posts = await rPost.getPostByDistrict(district);
                return posts; 
            }
            else if (!tag) {
                const posts = await rPost.getPostByCategoryDistrict(category, district);
                return posts; 
            }
            else if (!category) {
                const posts = await rPost.getPostByTagDistrict(tag, district);
                return posts; 
            }
            else if (!district) {
                const posts = await rPost.getPostByTagCategory(tag, category);
                return posts;
            }
            else {
                console.log("here");
                const posts = await rPost.getPostByTagCategoryDistrict(tag, category, district);
                return posts;
            }
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async getNewestPosts(n) {
        try {
            let posts = await rPost.getNewestPosts(n);
            for (let i = 0; i < posts.length; i++) {
                posts[i]['dataValues']['comment'] = await rComment.getCommentByPost(posts[i]['post_id']); 
                posts[i]['dataValues']['tag'] = await rTag.getTagByPost(posts[i]['post_id']);
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
                posts[i]['dataValues']['comment'] = await rComment.getCommentByPost(posts[i]['post_id']); 
                posts[i]['dataValues']['tag'] = await rTag.getTagByPost(posts[i]['post_id']);
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
                posts[i]['dataValues']['comment'] = await rComment.getCommentByPost(posts[i]['post_id']); 
                posts[i]['dataValues']['tag'] = await rTag.getTagByPost(posts[i]['post_id']);
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