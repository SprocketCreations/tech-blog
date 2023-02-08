const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequelize");

class Comment extends Model {}

Comment.init(
	{
		body: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				len: [1, 26000],
			}
		}
	},
	{
		sequelize,
		freezeTableName: true,
		modelName: "comments",
		timestamps: true,
		underscored: true,
	}
);


module.exports = Comment;
