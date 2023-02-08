const { Comment } = require("../../models");
const router = require("express").Router();
const { ReasonPhrases : R, StatusCodes : S} = require("http-status-codes");

router.get("/", async (req, res) => {
	try {
		const all = await Comment.findAll();
		if (all) {
			return res.json(all);
		}
		return res.status(S.NOT_FOUND).send(R.NOT_FOUND);
	} catch (error) {
		console.log(error);
		return res.status(S.INTERNAL_SERVER_ERROR).send(R.INTERNAL_SERVER_ERROR);
	}
});
router.get("/:id", async (req, res) => {
	try {
		const one = await Comment.findByPk(req.params.id);
		if (one) {
			return res.json(one);
		}
		return res.status(S.NOT_FOUND).send(R.NOT_FOUND);
	} catch (error) {
		console.log(error);
		return res.status(S.INTERNAL_SERVER_ERROR).send(R.INTERNAL_SERVER_ERROR);
	}
});
router.post("/", async (req, res) => {
	try {
		const values = {
			body: req.body.post.body,
			user_id: "idk",
		};
		const comment = await Comment.create(values);
		return res.status(S.CREATED).json(comment);
	} catch (error) {
		console.log(error);
		return res.status(S.INTERNAL_SERVER_ERROR).send(R.INTERNAL_SERVER_ERROR);
	}
});
router.put("/:id", async (req, res) => {
	try {
		const values = {
			body: req.body.post.body,
		};
		const [rows] = await Comment.update(values, { where: { id: req.params.id } });
		if (rows > 0) {
			return res.json(rows);
		}
		return res.status(S.NOT_FOUND).send(R.NOT_FOUND);
	} catch (error) {
		console.log(error);
		return res.status(S.INTERNAL_SERVER_ERROR).send(R.INTERNAL_SERVER_ERROR);
	}
});
router.delete("/:id", async (req, res) => {
	try {
		const rows = await Comment.destroy({ where: { id: req.params.id } });
		if (rows > 0) {
			return res.json(rows);
		}
		return res.status(S.NOT_FOUND).send(R.NOT_FOUND);
	} catch (error) {
		console.log(error);
		return res.status(S.INTERNAL_SERVER_ERROR).send(R.INTERNAL_SERVER_ERROR);
	}
});

module.exports = router;
