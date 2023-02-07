const { BlogPost } = require("../../models");
const router = require("express").Router();
const { ReasonPhrases : R, StatusCodes : S} = require("http-status-codes");

router.get("/", async (req, res) => {
	try {
		const all = await BlogPost.findAll();
		if (all) {
			return req.json(all);
		}
		return req.status(S.NOT_FOUND).send(R.NOT_FOUND);
	} catch (error) {
		console.log(error);
		return res.status(S.INTERNAL_SERVER_ERROR).send(R.INTERNAL_SERVER_ERROR);
	}
});
router.get("/:id", async (req, res) => {
	try {
		const one = await BlogPost.findByPk(req.params.id);
		if (one) {
			return req.json(one);
		}
		return req.status(S.NOT_FOUND).send(R.NOT_FOUND);
	} catch (error) {
		console.log(error);
		return res.status(S.INTERNAL_SERVER_ERROR).send(R.INTERNAL_SERVER_ERROR);
	}
});
router.post("/", async (req, res) => {
	try {
		const values = {
			title: req.body.post.title,
			body: req.body.post.body,
			user_id: "idk",
		};
		const blogpost = await BlogPost.create(values);
		return res.status(S.CREATED).json(blogpost);
	} catch (error) {
		console.log(error);
		return res.status(S.INTERNAL_SERVER_ERROR).send(R.INTERNAL_SERVER_ERROR);
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
		const rows = await BlogPost.destroy({ where: { id: req.params.id } });
		if (rows > 0) {
			return res.json(rows);
		}
		return req.status(S.NOT_FOUND).send(R.NOT_FOUND);
	} catch (error) {
		console.log(error);
		return res.status(S.INTERNAL_SERVER_ERROR).send(R.INTERNAL_SERVER_ERROR);
	}
});

module.exports = router;