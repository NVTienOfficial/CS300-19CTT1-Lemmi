const CommentRepo = require("../repos/comment_repo");
const Error = require("../config/error");

const rComment = new CommentRepo();

class CommentService {
    async makeComment(comment) {

        try {
            const newComment = await rComment
            return newComment;
        }
        catch (err) {
            if (err == null)
                throw new Error(500, err);
            throw new Error(err.statusCode, err.message);
        }
    }

    async generateNewID() {
        let id = await rComment.count();
        let cmt_id = await this.toStringID(id);
        const max_id = Math.pow(16,10) - 1;

        while (true) {
            let exist = await rComment.isExistID(cmt_id);

            if (exist) {
                id = ( (id % max_id ) + 8) % max_id;
                cmt_id = await this.toStringID(id);
            }
            else
                break;
        }
        
        return cmt_id;
    }

    async toStringID(id) {
        let str = id.toString(16);
        while (str.length < 10)
            str = '0' + str;
        return str;
    }
}

module.exports = CommentService;