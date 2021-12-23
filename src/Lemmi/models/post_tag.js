const { DataTypes, Deferrable } = require("sequelize");

const sequelize = require("../config/database");

const Tag = require("./tag");
const Post = require("./post");

const PostTag = sequelize.define('post_tag',
    {
        tag_id: {
            type: DataTypes.CHAR(3),
            primaryKey: true,
            references: {
                model: Tag,
                key: 'tag_id',
                deferrable: Deferrable.INITIALLY_DEFERRED,
            }
        },
        post_id: {
            type: DataTypes.CHAR(8),
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

Tag.hasMany(PostTag, {foreignKey: 'tag_id'});
PostTag.belongsTo(Tag, {foreignKey: 'tag_id'});

module.exports = PostTag;