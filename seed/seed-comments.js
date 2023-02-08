const { Comment } = require("../models");

const data = [
	{
		body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem impedit commodi voluptas et laudantium numquam! Porro at dicta vero placeat fugiat, deserunt fugit tempora consectetur aut nemo quod laborum magnam.",
		blogPostId: 1,
		userId: 2,
	}, {
		body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem impedit commodi voluptas et laudantium numquam! Porro at dicta vero placeat fugiat, deserunt fugit tempora consectetur aut nemo quod laborum magnam.",
		blogPostId: 4,
		userId: 3,
	}, {
		body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem impedit commodi voluptas et laudantium numquam! Porro at dicta vero placeat fugiat, deserunt fugit tempora consectetur aut nemo quod laborum magnam.",
		blogPostId: 2,
		userId: 1,
	},
];

const seedComments = async () => {
	await Comment.bulkCreate(data);
};

module.exports = seedComments;
