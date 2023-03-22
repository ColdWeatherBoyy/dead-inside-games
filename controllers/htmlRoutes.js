const router = require("express").Router();
// add this to all html routes that need to be behind the password wall
const withAuth = require("../utils/auth");

router.get("*", async (req, res) => {
	try {
		res.render("helloworld", {});
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
