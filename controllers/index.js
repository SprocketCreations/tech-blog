const { ReasonPhrases: R, StatusCodes: S } = require("http-status-codes");
const { BlogPost, User, Comment } = require("../models");
const router = require("express").Router();
const Sequilize = require("sequelize");

router.use("/api", require("./api"));

// Home page
router.get("/", async (req, res) => {
	try {
		const allPosts = await BlogPost.findAll({
			attributes: ["id", "title", "body", ["updated_at", "date"]],
			include: [{
				model: User,
				attributes: [["display_name", "author"]],
			}],
			order: [["updated_at", "DESC"]],
		});
		/** @type {Array<{title: string, body: string, author: string, date: string }>} */
		const posts = allPosts.map(post => {
			const json = post.toJSON();
			json.author = json.user?.author;
			json.user = undefined;
			json.date = new Date(json.date).toDateString();
			json.viewLink = `/post/${json.id}`;
			json.id = undefined;
			return json;
		});
		return res.render('home', { posts, loggedIn: req.session.userId !== undefined });
	} catch (error) {
		console.log(error);
		return res.status(S.INTERNAL_SERVER_ERROR).json({message: R.INTERNAL_SERVER_ERROR});
	}
});

router.get("/dashboard", async (req, res) => {
	try {
		if (req.session.userId) {
			const allPosts = await BlogPost.findAll({
				where: {userId: req.session.userId},
				attributes: ["id", "title", "body", ["updated_at", "date"]],
				include: [{
					model: User,
					attributes: [["display_name", "author"]],
				}],
				order: [["updated_at", "DESC"]],
			});
			const posts = allPosts.map(post => {
				const json = post.toJSON();
				return {
					title: json.title,
					body: json.body,
					author: json.user?.author,
					date: new Date(json.date).toDateString(),
				};
			})
			console.log(posts);
			return res.render("dashboard", {posts, loggedIn: true});
		}
		return res.status(S.FORBIDDEN).json({ message: R.FORBIDDEN });
	} catch (error) {
		console.log(error);
		return res.status(S.INTERNAL_SERVER_ERROR).json({message: R.INTERNAL_SERVER_ERROR});
	}
});

router.get("/post/new", async (req, res) => {
	return res.render("newpost", {loggedIn: req.session.userId !== undefined});
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
				separate: true,
				order: [["updatedAt", "DESC"]],
				attributes: ["body", ["updated_at", "date"]],
				include: [{
					model: User,
					attributes: [["display_name", "author"]],
				}],
			}],
		});
		if (post) {
			const data = post.toJSON();
			data.author = data.user?.author;
			data.user = undefined;
			data.id = req.params.id;
			data.comments.forEach(comment => {
				comment.author = comment.user?.author;
				comment.user = undefined;
				comment.date = new Date(comment.date).toDateString();
			});
			data.date = new Date(data.date).toDateString();
			return res.render("viewpost", { post: data, loggedIn: req.session.userId !== undefined });
		}
		return res.status(S.NOT_FOUND).json({message: R.NOT_FOUND});
	} catch (error) {
		console.log(error);
		return res.status(S.INTERNAL_SERVER_ERROR).json({message: R.INTERNAL_SERVER_ERROR});
	}
});

router.get("/signin", async (req, res) => {
	return res.render("signin");
});

router.get("/signup", async (req, res) => {
	return res.render("signup");
});

module.exports = router;
