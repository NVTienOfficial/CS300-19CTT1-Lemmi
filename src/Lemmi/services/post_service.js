const PostRepo = require("../repos/post_repo");
const UserRepo = require("../repos/user_repo");
const VoteRepo = require("../repos/vote_repo");
const CommentRepo = require("../repos/comment_repo");
const DistrictRepo = require("../repos/district_repo");
const TagRepo = require("../repos/tag_repo");
const ImageService = require("../services/image_service");
const TagService = require("../services/tag_service");
const Error = require("../config/error");

const rPost = new PostRepo();
const rUser = new UserRepo();
const rComment = new CommentRepo();
const rTag = new TagRepo();
const sTag = new TagService();
const sImage = new ImageService();
const rDistrict = new DistrictRepo();

class PostService {
    async createPost(post, images) {
        // post['star'] = 4;
        // post['user_id'] = '0001d';
        const {title, content, star, tags, report, user_id, post_date, district} = post;
        delete post['tags'];

        if (!title || !content || !star || star < 0) {
            throw new Error(400, "Bad request");
        }

        if (report & report < 0) {
            throw new Error(400, "Bad request");
        }

        if (user_id && user_id != "") {
            let existUser = await rUser.isExistID(user_id);
            if (!existUser)
                throw new Error(400, "Bad request");
        }

        try {
            let id = await this.generateNewID();
            post["post_id"] = id;
            
            const district_id = await rDistrict.getIDByName(district);
            delete post['district'];
            post['district_id'] = district_id;

            const newPost = await rPost.createOne(post);

            const post_tags = await sTag.createPostTags(id, tags);
            newPost['post_tag'] = post_tags;

            const img = await sImage.createImages(images, user_id, id);
            newPost["image"] = img;
            return newPost;
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async editPost(post, images) {
        // post['star'] = 4;
        // post['user_id'] = '0001d';
        const {post_id, title, content, star, tags, user_id, district} = post;
        delete post['tags'];

        if (user_id && user_id != "") {
            let existUser = await rUser.isExistID(user_id);
            if (!existUser)
                throw new Error(400, "Bad request");
        }

        try {
            await sTag.updatePostTag(post_id, tags);

            await sImage.updatePostImage(user_id, post_id, images);

            if (!title) {
                await rPost.updateTitle(title, post_id);
            }

            if (!content) {
                await rPost.updateContent(content, post_id);
            }

            if (!star) {
                await rPost.updateStar(content, post_id);
            }

            if (!district) {
                const district_id = await rDistrict.getIDByName(district);
                await rPost.updateDistrict(district_id, post_id);
            }

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
        if (!user_id && !tag && !district)
            return undefined;

        try {
            if (!tag) {
                const posts = await rPost.getUserPostByDistrict(district, user_id);
                return posts;
            }
            else if (!district) {
                const posts = await rPost.getUserPostByTag(tag, user_id);
                return posts;
            }
            else {
                const posts = await rPost.getUserPostByTagDistrict(tag, district, user_id);
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
                //posts[i]['comment'] = await rComment.getCommentByPost(posts[i]['post_id']);
                //posts[i]['tag'] = await rTag.getTagByPost(posts[i]['post_id']);
                posts[i]['name'] = await rTag.getTagPlaceByPostID(posts[i]['post_id']);
                // posts[i]['name'] = "";
                posts[i]['image'] = undefined;
                // let tags = posts[i]['tag'];
                // if (tags != undefined) {
                //     for (let j = 0; j < tags.length; j++) {
                //         if (tags[j]['type'] == "Tên quán") {
                //             posts[i]['name'] = tags[j]['name']
                //         }
                //     }
                // }
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
                //posts[i]['comment'] = await rComment.getCommentByPost(posts[i]['post_id']); 
                posts[i]['tag'] = await rTag.getTagByPost(posts[i]['post_id']);
                // posts[i]['name'] = "";
                posts[i]['image'] = undefined;
                // let tags = posts[i]['tag'];
                // if (tags != undefined) {
                //     for (let j = 0; j < tags.length; j++) {
                //         if (tags[j]['type'] == "Tên quán") {
                //             posts[i]['name'] = tags[j]['name']
                //         }
                //     }
                // }
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
                //posts[i]['comment'] = await rComment.getCommentByPost(posts[i]['post_id']); 
                posts[i]['tag'] = await rTag.getTagByPost(posts[i]['post_id']);
                // posts[i]['name'] = "";
                posts[i]['image'] = undefined;
                // let tags = posts[i]['tag'];
                // if (tags != undefined) {
                //     for (let j = 0; j < tags.length; j++) {
                //         if (tags[j]['type'] == "Tên quán") {
                //             posts[i]['name'] = tags[j]['name']
                //         }
                //     }
                // }
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