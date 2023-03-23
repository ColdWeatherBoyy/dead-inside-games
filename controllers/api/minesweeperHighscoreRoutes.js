const router = require("express").Router();
const { User, MinesweeperHighscores } = require("../../models/index.js");

router.post("/", async (req, res) => {
	try {
		// add back in when sessions online
		// const user_id = req.session.user_id;
		const user_id = 4;

		const { score } = req.body;

		// checks to make sure score
		if (!score) {
			return res
				.status(404)
				.json("How do you think you're going to save a highscore without a highscore?");
		}

		const newScore = await MinesweeperHighscores.create({ score, user_id });

		res.status(200).json(newScore);
	} catch (err) {
		res.status(500).json(err);
	}
});

// get route for pulling all highscores (testing)
router.get("/", async (req, res) => {
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
		});

		res.status(200).json(highscoreData);
	} catch (err) {
		res.status(500).json(err);
	}
});
//creating a delete route for deleting the high scores
router.delete("/:id", async (req, res) => {
	try {
		const highscore_id = req.params.id;

		const highscoreData = await MinesweeperHighscores.destroy({
			where: { id: highscore_id },
		});

		if (!highscoreData) {
			return res.status(404).json({ message: "Invalid Score." });
		}
		res.status(200).json(highscoreData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
