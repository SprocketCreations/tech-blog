require("dotenv").config();
const sequelize = require("../config/connection");

const db = require("../models");

const seedUsers = require("./seed-users");
const seedBlogposts = require("./seed-blogposts");
const seedComments = require("./seed-comments");

sequelize.sync({force: true}).then(async () => {
	console.log("Seeding Users Table");
	await seedUsers();

	console.log("Seeding Blogposts Table");
	await seedBlogposts();

	console.log("Seeding Comments Table");
	await seedComments();

	process.exit(0);
});
