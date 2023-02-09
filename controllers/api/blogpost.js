const { BlogPost } = require("../../models");
const router = require("express").Router();
const { ReasonPhrases: R, StatusCodes: S } = require("http-status-codes");

router.get("/", async (req, res) => {
	try {
		const all = await BlogPost.findAll();
		if (all) {
			return res.json({ message: R.OK, posts: all });
		}
		return res.status(S.NOT_FOUND).json({ message: R.NOT_FOUND });
	} catch (error) {
		console.log(error);
		return res.status(S.INTERNAL_SERVER_ERROR).json({ message: R.INTERNAL_SERVER_ERROR });
	}
});
router.get("/:id", async (req, res) => {
	try {
		const one = await BlogPost.findByPk(req.params.id);
		if (one) {
			return res.json({ message: R.OK, post: one });
		}
		return res.status(S.NOT_FOUND).json({ message: R.NOT_FOUND });
	} catch (error) {
		console.log(error);
		return res.status(S.INTERNAL_SERVER_ERROR).json({ message: R.INTERNAL_SERVER_ERROR });
	}
});
router.post("/", async (req, res) => {
	if (req.session.userId) {
		try {
			const values = {
				title: req.body.post.title,
				body: req.body.post.body,
				userId: req.session.userId,
			};
			const blogpost = await BlogPost.create(values);
			return res.status(S.CREATED).json({ message: R.CREATED, post: blogpost });
		} catch (error) {
			console.log(error);
			return res.status(S.INTERNAL_SERVER_ERROR).json({ message: R.INTERNAL_SERVER_ERROR });
		}
	} else {
		return res.status(S.FORBIDDEN).json({ message: R.FORBIDDEN });
	}
});
router.put("/:id", async (req, res) => {
	try {
		const values = {
			title: req.body.post.title,
			body: req.body.post.body,
		};
		const [rows] = await BlogPost.update(values, { where: { id: req.params.id } });
		if (rows > 0) {
			return res.json({ message: R.OK, rows: rows });
		}
		return res.status(S.NOT_FOUND).json({ message: R.NOT_FOUND });
	} catch (error) {
		console.log(error);
		return res.status(S.INTERNAL_SERVER_ERROR).json({ message: R.INTERNAL_SERVER_ERROR });
	}
});
router.delete("/:id", async (req, res) => {
	try {
		const rows = await BlogPost.destroy({ where: { id: req.params.id } });
		if (rows > 0) {
			return res.json({ message: R.OK, rows: rows });
		}
		return res.status(S.NOT_FOUND).json({ message: R.NOT_FOUND });
	} catch (error) {
		console.log(error);
		return res.status(S.INTERNAL_SERVER_ERROR).json({ message: R.INTERNAL_SERVER_ERROR });
	}
});

module.exports = router;
