const { DataTypes, Deferrable } = require("sequelize");

const sequelize = require("../config/database");

const User = require("./user");
const Post = require("./post")

const Comment = sequelize.define('comment',
    {
        comment_id: {
            type: DataTypes.CHAR(20),
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.CHAR(10),
            references: {
                model: User,
                key: 'user_id',
                deferrable: Deferrable.INITIALLY_DEFERRED,
            }
        },
        post_id: {
            type: DataTypes.CHAR(15),
            references: {
                model: Post,
                key: 'post_id',
                deferrable: Deferrable.INITIALLY_DEFERRED,
            }
        },
        target_comment: {
            type: DataTypes.CHAR(20),
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        comment_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);

Comment.belongsTo(Comment, { foreignkey: "comment_id" });

module.exports = Comment;