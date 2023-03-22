const router = require("express").Router();
const { User, MinesweeperHighscores } = require("../models/index.js");
// add this to all html routes that need to be behind the password wall
const withAuth = require("../utils/auth");

// get route for top 15 Highscores in Minesweeper – this will need to be included in our main minesweeper route
// also needs to have withAuth added to it once login is configured
router.get("/minesweeper", async (req, res) => {
	try {
		const highscoreData = await MinesweeperHighscores.findAll({
			attributes: ["score", "created_at", "user_id"],
			include: [
				{
					model: User,
					attributes: ["username"],
				},
			],
			order: [["score", "DESC"]],
			limit: 10,
		});

		const highscores = highscoreData.map((highscore) => highscore.get({ plain: true }));

		res.status(200).json(highscores);
		// for the eventual render (use a partial)
		// res.render("minesweeper", { highscores, loggedIn: req.session.loggedIn })
	} catch (err) {
		res.status(500).json(err);
	}
});

// generic hello world html route (turn into 404 page eventually)
router.get("*", async (req, res) => {
	try {
		res.render("helloworld", {});
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
