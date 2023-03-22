const router = require("express").Router();
const { User, MinesweeperHighscores } = require("../../models/index.js");

router.post("/", async (req, res) => {
	try {
		// add back in when sessions online
		// const user_id = req.session.user_id;
		const user_id = 4;

		const score = req.body;

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

module.exports = router;
