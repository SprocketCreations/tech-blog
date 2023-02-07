
const BlogPost = require("./BlogPost");
const Comment = require("./Comment");
const User = require("./User");


BlogPost.hasMany(Comment);

User.hasMany(BlogPost);
User.hasMany(Comment);

module.exports = {
	BlogPost,
	Comment,
	User
};
