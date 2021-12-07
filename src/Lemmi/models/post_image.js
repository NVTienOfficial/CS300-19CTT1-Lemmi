const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");

const Image = require("./image");
const Post = require("./post");

const PostImage = sequelize.define('post_image',
    {
        image_id: {
            type: DataTypes.CHAR(8),
            primaryKey: true,
            references: {
                model: Image,
                key: 'image_id',
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

module.exports = PostImage;