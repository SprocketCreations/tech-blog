const { ReasonPhrases: R, StatusCodes: S } = require("http-status-codes");
const { BlogPost } = require("../models");
const router = require("express").Router();

router.use("/api", require("./api"));

// Home page
router.get("/", (req, res) => {
	return res.render('home');
});

router.get("/dashboard", async (req, res) => {
	return res.render("dashboard");
});

router.get("/post/new", async (req, res) => {
	return res.render("newpost");
});

router.get("/post/:id", async (req, res) => {
	try {
		const post = await BlogPost.findByPk(req.params.id);
		if(post) {
			const data = post.toJSON();
			return res.render("viewpost", data);
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
