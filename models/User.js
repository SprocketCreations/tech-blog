const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

class User extends Model {}

User.init(
	{
		displayName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			}
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true, 
				isEmail: true,
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
				// Matches <7|no num|no upper|no lower|no special
				not: /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/,
			},
		}
	},
	{
		sequelize,
		freezeTableName: true,
		modelName: "users",
		timestamps: false,
		underscored: true,
		hooks: {
			beforeCreate: async user => {
				user.password = await bcrypt.hash(user.password, 10);
				return user;
			},
		}
	}
);


module.exports = User;
