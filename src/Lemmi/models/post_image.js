const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");

const Image = require("./image");
const Post = require("./post");

const PostImage = sequelize.define('post_image',
    {
        image_id: {
            type: DataTypes.CHAR(8),
            primaryKey: true,
        },
        post_id: {
            type: DataTypes.CHAR(8),
            primaryKey: true,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);

Post.hasMany(PostImage, {foreignKey: 'post_id'});
Image.hasMany(PostImage, {foreignKey: 'image_id'});
PostImage.belongsTo(Image, {foreignKey: 'image_id'});
PostImage.belongsTo(Post, {foreignKey: 'post_id'});

module.exports = PostImage;