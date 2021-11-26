require("dotenv").config();
const Sequelize = require("sequelize");

const sequelize = new Sequelize (
    `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
	{
		logging: false,
	}
);

module.exports = sequelize;