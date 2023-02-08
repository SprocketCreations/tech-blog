const { User } = require("../../models");
const bcrypt = require("bcrypt");
const router = require("express").Router();
const { ReasonPhrases: R, StatusCodes: S } = require("http-status-codes");
const { json } = require("express");


router.use("blogpost", require("./blogpost.js"));
router.use("comment", require("./comment.js"));

router.post("/signup", async (req, res) => {
	try {
		const values = {
			displayName: req.body.displayName,
			email: req.body.email,
			password: req.body.password,
		};
		const user = await User.create(values);
		return res.status(S.CREATED).json({ msg: R.CREATED, sessionToken: "we4mc85894ev" });
	} catch (error) {
		console.log(error);
		return res.status(S.INTERNAL_SERVER_ERROR).send(R.INTERNAL_SERVER_ERROR);
	}
});

router.post("/login", async (req, res) => {
	try {
		const email = req.body.email;
		const password = req.body.password;
		const user = await User.findOne({ where: { email } });
		if (await bcrypt.compare(password, user.password)) {
			return res.status(S.CREATED).json({ msg: R.CREATED, sessionToken: "we4mc85894ev" });
		}
		return res.status(S.BAD_REQUEST).json({ msg: "Email or password is incorrect." });
	} catch (error) {
		console.log(error);
		return res.status(S.INTERNAL_SERVER_ERROR).send(R.INTERNAL_SERVER_ERROR);
	}
});


module.exports = router;
