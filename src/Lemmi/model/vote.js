const { DataTypes, Deferrable } = require("sequelize");

const sequelize = require("../config/database");

const User = require("./user");
const Post = require("./post")

const Vote = sequelize.define('vote',
    {
        user_id: {
            type: DataTypes.CHAR(10),
            primaryKey: true,
            references: {
                model: User,
                key: 'user_id',
                deferrable: Deferrable.INITIALLY_DEFERRED,
            },
        },
        post_id: {
            type: DataTypes.CHAR(15),
            primaryKey: true,
            references: {
                model: Post,
                key: 'post_id',
                deferrable: Deferrable.INITIALLY_DEFERRED,
            },
        },
        type: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            validate: {
                isIn: [[-1, 0, 1]],
            },
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = Vote;