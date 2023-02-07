const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequelize");

class BlogPost extends Model {}

BlogPost.init(
	{
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [5],
			}
		},
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
		modelName: "blog_posts",
		timestamps: false,
		underscored: true,
	}
);


module.exports = BlogPost;
