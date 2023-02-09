const { Sequelize } = require("sequelize");

const getSequelize = ()=> {
	if(process.env.JAWSDB_URL){
		return new Sequelize(process.env.JAWSDB_URL);
	}
	return new Sequelize(
		process.env.DB_NAME,
		process.env.DB_USER,
		process.env.DB_PASS,
		{
			host: process.env.DB_HOST,
			dialect: "mysql",
			port: 3306
		}
	);
};

const sequelize = getSequelize();

module.exports = sequelize;
