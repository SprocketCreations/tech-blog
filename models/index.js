
const BlogPost = require("./BlogPost");
const Comment = require("./Comment");
const User = require("./User");


BlogPost.hasMany(Comment);
Comment.belongsTo(BlogPost);

User.hasMany(BlogPost);
BlogPost.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

module.exports = {
	BlogPost,
	Comment,
	User
};
