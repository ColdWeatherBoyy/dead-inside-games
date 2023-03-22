const router = require("express").Router();
const { User, MinesweeperHighscores } = require("../models/index.js");

router.get("*", async (req, res) => {
	try {
		res.render("helloworld", {});
	} catch (err) {
		res.status(500).json(err);
	}
});

// get route for top 15 Highscores in Minesweeper – this will need to be added to our main minesweeper route
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

module.exports = router;
