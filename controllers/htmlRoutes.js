const router = require("express").Router();
const { User, MinesweeperHighscores } = require("../models/index.js");
// add this to all html routes that need to be behind the password wall
const withAuth = require("../utils/auth");
const ifLoggedIn = require("../utils/loggedInCheck");

// get route for top 15 Highscores in Minesweeper – this will need to be included in our main minesweeper route
// also needs to have withAuth added to it once login is configured
router.get("/minesweeper", withAuth, async (req, res) => {
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
		//to be enabled when sessions are live
		const username = req.session.username;

		// grabs the data values only
		const highscores = highscoreData.map((highscore) => highscore.get({ plain: true }));

		// placeholder image for game
		const placeholderImage = { imageURL: "/images/samplepic.png" };

		res.render("minesweeper", {
			highscores,
			username: username,
			placeholderImage,
			loggedIn: req.session.loggedIn,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// HTML get route for login page
router.get("/login", ifLoggedIn, async (req, res) => {
	try {
		res.render("login", {});
	} catch (err) {
		res.status(500).json(err);
	}
});

// HTML get route for signup page
router.get("/signup", ifLoggedIn, async (req, res) => {
	try {
		res.render("signup", {});
	} catch (err) {
		res.status(500).json(err);
	}
});

// redirect from main homepage
router.get("/", async (req, res) => {
	try {
		res.redirect("/minesweeper");
	} catch (err) {
		res.status(500).json(err);
	}
});

// 404 page
router.get("*", async (req, res) => {
	try {
		const errorImage = { imageURL: "/images/404_Image.png" };

		// const image = errorImage.get({ plain: true });

		res.render("errormessage", { errorImage });
	} catch (err) {
		res.status(500).json(err);
	}
});

// generic hello world html route (turn into 404 page eventually)
// router.get("*", async (req, res) => {
// 	try {
// 		res.render("helloworld", {});
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

module.exports = router;
