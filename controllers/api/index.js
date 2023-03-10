const { User } = require("../../models");
const bcrypt = require("bcrypt");
const router = require("express").Router();
const { ReasonPhrases: R, StatusCodes: S } = require("http-status-codes");


router.use("/blogpost", require("./blogpost.js"));
router.use("/comment", require("./comment.js"));

router.post("/signup", async (req, res) => {
	try {
		// Check that email isnt taken
		if (await User.findOne({ where: { email: req.body.email } })) {
			return res.status(S.FORBIDDEN).json({ message: R.FORBIDDEN, alert: "Error: Email is already taken." });
		}

		console.log(req.body);
		const values = {
			displayName: req.body.displayName,
			email: req.body.email,
			password: req.body.password,
		};
		const user = await User.create(values);
		req.session.userId = user.id;
		return res.status(S.CREATED).json({ message: R.CREATED });
	} catch (error) {
		console.log(error);
		return res.status(S.INTERNAL_SERVER_ERROR).json({ message: R.INTERNAL_SERVER_ERROR });
	}
});

router.post("/signin", async (req, res) => {
	try {
		const email = req.body.email;
		const password = req.body.password;
		const user = await User.findOne({ where: { email } });
		if (user && await bcrypt.compare(password, user.password)) {
			req.session.userId = user.id;
			return res.status(S.CREATED).json({ message: R.CREATED });
		}
		return res.status(S.FORBIDDEN).json({ message: R.FORBIDDEN, alert: "Email or password is incorrect." });
	} catch (error) {
		console.log(error);
		return res.status(S.INTERNAL_SERVER_ERROR).json({ message: R.INTERNAL_SERVER_ERROR });
	}
});

router.delete("/signout", async (req, res) => {
	try {
		if (req.session.userId) {
			req.session.destroy();
			return res.json({ message: R.OK, rows: 1 });
		}
		return res.status(S.NOT_FOUND).json({ message: R.NOT_FOUND });
	} catch (error) {
		console.log(error);
		return res.status(S.INTERNAL_SERVER_ERROR).json({ message: R.INTERNAL_SERVER_ERROR });
	}
});


module.exports = router;
