const { Comment } = require("../../models");
const router = require("express").Router();
const { ReasonPhrases: R, StatusCodes: S } = require("http-status-codes");

router.get("/", async (req, res) => {
	try {
		const all = await Comment.findAll();
		if (all) {
			return res.json({ message: R.OK, comments: all });
		}
		return res.status(S.NOT_FOUND).json({ message: R.NOT_FOUND });
	} catch (error) {
		console.log(error);
		return res.status(S.INTERNAL_SERVER_ERROR).json({ message: R.INTERNAL_SERVER_ERROR });
	}
});
router.get("/:id", async (req, res) => {
	try {
		const one = await Comment.findByPk(req.params.id);
		if (one) {
			return res.json({ message: R.OK, comment: one });
		}
		return res.status(S.NOT_FOUND).json({ message: R.NOT_FOUND });
	} catch (error) {
		console.log(error);
		return res.status(S.INTERNAL_SERVER_ERROR).json({ message: R.INTERNAL_SERVER_ERROR });
	}
});
router.post("/", async (req, res) => {
	try {
		if (req.session.userId) {
			const values = {
				blogPostId: req.body.post.blogPostId,
				body: req.body.post.body,
				userId: req.session.userId,
			};
			const comment = await Comment.create(values);
			return res.status(S.CREATED).json({ message: R.CREATED, comment: comment });
		} else {
			return res.status(S.FORBIDDEN).json({ message: R.FORBIDDEN });
		}
	} catch (error) {
		console.log(error);
		return res.status(S.INTERNAL_SERVER_ERROR).json({ message: R.INTERNAL_SERVER_ERROR });
	}
});
router.put("/:id", async (req, res) => {
	try {
		const values = {
			body: req.body.post.body,
		};
		const [rows] = await Comment.update(values, { where: { id: req.params.id } });
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
		const rows = await Comment.destroy({ where: { id: req.params.id } });
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
