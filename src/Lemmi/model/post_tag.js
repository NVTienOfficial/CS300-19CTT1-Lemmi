const { DataTypes, Deferrable } = require("sequelize");

const sequelize = require("../config/database");

const Tag = require("./tag");
const Post = require("./post");

const PostTag = sequelize.define('post_tag',
    {
        tag_id: {
            type: DataTypes.CHAR(10),
            primaryKey: true,
            references: {
                model: Tag,
                key: 'tag_id',
                deferrable: Deferrable.INITIALLY_DEFERRED,
            }
        },
        post_id: {
            type: DataTypes.CHAR(15),
            primaryKey: true,
            references: {
                model: Post,
                key: 'post_id',
                deferrable: Deferrable.INITIALLY_DEFERRED,
            }
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = PostTag;