const { BlogPost } = require("../models");

const data = [
	{
		title: "Musings about Mysql",
		body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem impedit commodi voluptas et laudantium numquam! Porro at dicta vero placeat fugiat, deserunt fugit tempora consectetur aut nemo quod laborum magnam.",
		userId: 1,
	}, {
		title: "Speed comparison between Node.js and Next.js",
		body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem impedit commodi voluptas et laudantium numquam! Porro at dicta vero placeat fugiat, deserunt fugit tempora consectetur aut nemo quod laborum magnam.",
		userId: 2,
	}, {
		title: "Why [new language] will kill C++",
		body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem impedit commodi voluptas et laudantium numquam! Porro at dicta vero placeat fugiat, deserunt fugit tempora consectetur aut nemo quod laborum magnam.",
		userId: 3,
	}, {
		title: "Ten CSS tricks to impress recruiters!",
		body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem impedit commodi voluptas et laudantium numquam! Porro at dicta vero placeat fugiat, deserunt fugit tempora consectetur aut nemo quod laborum magnam.",
		userId: 4,
	}, {
		title: "Why I don't use ORMs, and you should'nt either.",
		body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem impedit commodi voluptas et laudantium numquam! Porro at dicta vero placeat fugiat, deserunt fugit tempora consectetur aut nemo quod laborum magnam.",
		userId: 5,
	}, 
];

const seedBlogposts = async () => {
	await BlogPost.bulkCreate(data);
};

module.exports = seedBlogposts;
