const router = require("express").Router();
const auth = require("../middleware/auth");

const AccountService = require("../services/account_service");
const PostService = require("../services/post_service");
const TagService = require("../services/tag_service");
const DistrictService = require("../services/district_service");

const sAccount = new AccountService();
const sPost = new PostService();
const sTag = new TagService();
const sDistrict = new DistrictService();

router.post("/login", async (req, res) => {
    let result;
    try {
        result = await sAccount.login(req.body);
        const username = req.body.username;
        req.session.token = result.token;
        req.session.username = username;
        req.session.userid = result.id;
        return res.redirect(req.session.redirectTo || '/');
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
    
});

//Dat
router.get("/login", (req, res) => {
    res.render('login');
});

router.get("/logout", (req, res) => {
    delete req.session.userid
    delete req.session.username
    delete req.session.token
    delete req.session.mypost;
    return res.redirect(req.session.redirectTo || '/');
});

router.get("/", async (req, res) => {
    try {
        /* 
        ** Return three objects containing posts
        ** {
        **    newest: []            -> sorted array of posts
        **    comment: []           -> sorted array of posts
        **    vote: []              -> sorted array of posts
        ** }
        **
        ** Each of posts in three above objects (newest, etc)
        ** {
        **    post_id:              -> post id
        **    title:                -> title
        **    content:              -> content
        **    star:                 -> star point
        **    report:               -> number of report
        **    user_id:              -> user id
        **    post_date:            -> date when post is created
        **    upvote:               -> number of upvote
        **    downvote:             -> number of downvote
        **    n_comment:            -> number of comments
        **    comment: []           -> array of comment in posts
        **    tag: []               -> array of tag names
        **    district_name:        -> district name
        **    name:                 -> name of target restaurant
        **    user_name:            -> name of user make post
        **    district_id           -> district id
        ** }
        **
        ** Structure of array comment:
        ** {
        **      comment_id
        **      user_id
        **      post_id
        **      content
        **      comment_date
        **      report
        **      user_name           -> name of user make comment
        ** }
        **
        ** Structure of array tag:
        ** {
        **      tag_id
        **      name                -> name of tag
        **      type                -> category of tag
        **      post_tag: []
        ** }
        */

        const userid = req.session.userid || undefined;
        const f_tag = req.session.f_tag || undefined;
        const d_tag = req.session.d_tag || undefined;
        const mypost = req.session.mypost || undefined;

        // const filter_posts = await sPost.filter(f_tag, d_tag, userid);
        // const filter_userPosts = await sPost.filterUser(f_tag, d_tag, userid);

        console.time('Query time');
        console.log("start");
        const newest_post = await sPost.getNewestPosts(20);
        // console.log(newest_post);
        const comment_post = await sPost.getMostCommentPosts(20);
        const vote_post = await sPost.getMostVotePost(20);
        console.log("end");
        const tag = await sTag.getAllTagNamesExcept("Tên quán");
        const district = await sDistrict.getAllDistrictName();
        console.timeEnd('Query time');
        req.session.redirectTo = `/`;

        // Take this object to parse layout       ** NOTICE **
        const posts = {
            newest: newest_post,
            comment: comment_post,
            vote: vote_post,
            tag: tag,
            district: district
        }

        // const f_tag = req.session.f_tag || undefined;
        // const d_tag = req.session.d_tag || undefined;
        // const mypost = req.session.mypost || undefined;
        // const userid = req.session.userid || undefined;
        const username = req.session.username || undefined;
        res.render('home', { userid, username, ...posts, f_tag, d_tag, mypost});

    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }

});


router.get("/filter", async (req, res) => {
    try {
        // return array contain object which include post data
        // const posts = await sPost.filter(req.query.tag, req.query.district);
        res.status(200).json({
            data: posts
        })
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});


router.get("/filter/tag/:t", (req, res) => {
    req.session.f_tag = req.params.t;
    return res.redirect('/');
});

router.get("/filter/district/:d", (req, res) => {
    req.session.d_tag = req.params.d;
    return res.redirect('/');
});

router.get("/filter/mypost", (req, res) => {
    delete req.session.d_tag;
    delete req.session.f_tag;
    req.session.mypost = true;
    return res.redirect('/');
});

router.get("/filter/clear", (req, res) => {
    delete req.session.d_tag;
    delete req.session.f_tag;
    delete req.session.mypost;
    return res.redirect('/');
});




module.exports = router;