const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");

const User = require("./user");
const Supplier = require("./supplier");
const Post = require("./post")

const Comment = sequelize.define('comment',
    {
        owner_id: {
            type: DataTypes.CHAR(11),
            primaryKey: true,
        },
        post_id: {
            type: DataTypes.CHAR(11),
            primaryKey: true,
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

Comment.belongsTo(User, { foreignKey: "user_id"});
Comment.belongsTo(Supplier, {foreignKey: "supplier_id"});
Comment.belongsTo(Post, {foreignKey: "post_id"});

module.exports = Comment;