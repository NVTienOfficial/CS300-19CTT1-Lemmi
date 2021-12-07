const { DataTypes, Deferrable } = require("sequelize");

const sequelize = require("../config/database");

const User = require("./user");

const Post = sequelize.define('post',
    {
        post_id: {
            type: DataTypes.CHAR(8),
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        star: {
            type: DataTypes.DECIMAL(1, 1),
            allowNull: false,
        },
        report: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0,
            },
        },
        user_id: {
            type: DataTypes.CHAR(5),
            references: {
                model: User,
                key: 'user_id',
                deferrable: Deferrable.INITIALLY_DEFERRED,
            },
        },
        post_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = Post;