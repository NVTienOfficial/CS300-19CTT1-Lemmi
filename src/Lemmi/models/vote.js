const { DataTypes, Deferrable } = require("sequelize");

const sequelize = require("../config/database");

const User = require("./user");
const Post = require("./post")

const Vote = sequelize.define('vote',
    {
        user_id: {
            type: DataTypes.CHAR(5),
            primaryKey: true,
            references: {
                model: User,
                key: 'user_id',
                deferrable: Deferrable.INITIALLY_DEFERRED,
            },
        },
        post_id: {
            type: DataTypes.CHAR(8),
            primaryKey: true,
            references: {
                model: Post,
                key: 'post_id',
                deferrable: Deferrable.INITIALLY_DEFERRED,
            },
        },
        type: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = Vote;