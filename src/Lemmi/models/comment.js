const { DataTypes, Deferrable } = require("sequelize");

const sequelize = require("../config/database");

const User = require("./user");
const Post = require("./post")

const Comment = sequelize.define('comment',
    {
        comment_id: {
            type: DataTypes.CHAR(10),
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.CHAR(5),
            references: {
                model: User,
                key: 'user_id',
                deferrable: Deferrable.INITIALLY_DEFERRED,
            }
        },
        post_id: {
            type: DataTypes.CHAR(8),
            references: {
                model: Post,
                key: 'post_id',
                deferrable: Deferrable.INITIALLY_DEFERRED,
            }
        },
        target_id: {
            type: DataTypes.CHAR(10),
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        comment_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        report: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);

Comment.belongsTo(Comment, { foreignkey: "comment_id" });

module.exports = Comment;