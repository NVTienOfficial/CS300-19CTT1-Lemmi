const { DataTypes, Deferrable } = require("sequelize");

const sequelize = require("../config/database");

const User = require("./user");

const Image = sequelize.define('image',
    {
        image_id: {
            type: DataTypes.CHAR(20),
            primaryKey: true,
        },
        src: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.CHAR(10),
            references: {
                model: User,
                key: 'user_id',
                deferrable: Deferrable.INITIALLY_DEFERRED,
            }
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = Image;