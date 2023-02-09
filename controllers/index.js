const { ReasonPhrases: R, StatusCodes: S } = require("http-status-codes");
const { BlogPost, User, Comment } = require("../models");
const router = require("express").Router();
const Sequilize = require("sequelize");

router.use("/api", require("./api"));

// Home page
router.get("/", async (req, res) => {
	const allPosts = await BlogPost.findAll({
		attributes: ["title", "body", ["updated_at", "date"]],
		include: [{
			model: User,
			attributes: [["display_name", "author"]],
		}],
	});
	/** @type {Array<{title: string, body: string, author: string, date: string }>} */
	const posts = allPosts.map(post => {
		const json = post.toJSON();
		json.author = json.user.author;
		json.user = null;
		json.date = new Date(json.date).toDateString();
		return json;
	});
	return res.render('home', {posts, loggedIn: req.session.userId !== null});
});

router.get("/dashboard", async (req, res) => {
	return res.render("dashboard");
});

router.get("/post/new", async (req, res) => {
	return res.render("newpost");
});

router.get("/post/:id", async (req, res) => {
	try {
		const post = await BlogPost.findByPk(req.params.id, {
			attributes: ["title", "body", ["updated_at", "date"]],
			include: [{
				model: User,
				attributes: [["display_name", "author"]],
			}, {
				model: Comment,
				attributes: ["body", ["updated_at", "date"]],
				include: [{
					model: User,
					attributes: [["display_name", "author"]],
				}]
			}],
		});
		if(post) {
			const data = post.toJSON();
			data.author = data.user.author;
			data.user = null;
			console.log(data);
			return res.render("viewpost", {post: data, loggedIn: req.session.userId !== null});
		}
		return res.status(S.NOT_FOUND).send(R.NOT_FOUND);
	} catch (error) {
		console.log(error);
		return res.status(S.INTERNAL_SERVER_ERROR).send(R.INTERNAL_SERVER_ERROR);
	}
});

router.get("/signin", async (req, res) => {
	return res.render("signin");
});

router.get("/signup", async (req, res) => {
	return res.render("signup");
});

module.exports = router;
