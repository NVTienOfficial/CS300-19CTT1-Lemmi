const router = require("express").Router();

const PostService = require("../services/post_service");
const VoteService = require("../services/vote_service");
const CommentService = require("../services/comment_service");
const TagService = require("../services/tag_service");
const ImageService = require("../services/image_service");
const multer = require('multer');
const { storage } = require('../config/cloudinary');


const upload = multer({ storage });

const sPost = new PostService();
const sVote = new VoteService();
const sComment = new CommentService();
const sTag = new TagService();
const sImage = new ImageService();



router.post("/create", upload.array('postimage'), async (req, res) => {
    try {
        // [Object: null prototype] {
        //     user_id: '0001d',
        //     title: 'testPost',
        //     district: 'Quận 5',
        //     tags: [ 'Món Việt', 'Sang trọng', 'Yên tĩnh' ],
        //     content: 'abcxyz',
        //     star: 4.5
        //     }
        // files: [
        //     {
        //         ...
        //         path: 'https://res.cloudinary.com/lemmiimage/image/upload/v1641871491/isabigwxqliaar422gbf.jpg',
        //     },
        //     {
        //         ...
        //         path: 'https://res.cloudinary.com/lemmiimage/image/upload/v1641871491/xlnyrg7oswrljicwr0js.png',
        //     }
        // ]

        // console.log(req.body);
        // console.log("files:", req.files);
        const images = [];
        for (let i = 0; i < req.files.length; i++) {
            images.push(req.files[i]['path']);
        }
        const post = await sPost.createPost(req.body, images);

        console.log(post);
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

router.put("/:id", async(req, res) => {
    // Edit post
    try {
        const images = [];
        for (let i = 0; i < req.files.length; i++) {
            images.push(req.files[i]['path']);
        }
        const post = await sPost.editPost(req.body, images);

        console.log(post);
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
})

router.get("", async (req, res) => {
    try {
        let posts = await sPost.getAllPosts();
        return res.status(201).json({
            status: "OK",
            message: "Success",
            data: posts,
        });
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const postid = req.params.id;
        const post = await sPost.getPostByID(req.params.id);
        const vote = await sVote.getPostVote(req.params.id);
        let posttag = await sTag.getTagNameByPost(post["post_id"]);
        posttag = posttag.filter(el => el !== null);
        const user_vote = await sVote.getUserIDVotePost(postid);
        const comment = await sComment.getPostComments(req.params.id);
        // array of image path
        const image_path = await sImage.getAllImagesByPostID(postid);
        ///////////////
        const userid = req.session.userid || undefined;
        const username = req.session.username || undefined;
        req.session.redirectTo = `/post/${req.params.id}`;
        
        

        res.render('postdetail', {userid, username, post, vote, comment, postid, posttag, user_vote});        
    }
    catch (err) {
        
        return res.status(err.statusCode).json(err);
    }
});

router.get("/user", async (req, res) => {
    try {
        let posts = await sPost.getAllPostsByUser(req.query.id);
        return res.status(201).json({
            status: "OK",
            message: "Success",
            data: posts,
        });
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await sPost.deletePostByID(req.params.id);
        //return res.status(200).json({});
        return res.redirect('/');
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
})

router.delete("/user", async (req, res) => {
    try {
        await sPost.deletePostByUser(req.query.id);
        return res.status(200).json({
            status: "OK",
            message: "success",
        })
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
})

module.exports = router;