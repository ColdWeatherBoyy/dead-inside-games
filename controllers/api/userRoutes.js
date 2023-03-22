const router = require("express").Router();
const { User, MinesweeperHighscores } = require("../../models/index");

// route for login creation
router.post("/", async (req, res) => {
	try {
		const { username, password } = req.body;

		// validates that both username and password have been submitted
		if (!username || !password) {
			return res.status(404).json("Please provide a unique username and password");
		}

		// creates new User
		const newUser = await User.create({ username, password });

		// activates current loggedin session
		req.session.save(() => {
			req.session.username = newUser.username;
			req.session.loggedIn = true;

			res
				.status(200)
				.json({ user: newUser, message: "You're ready to die (inside only)." });
		});

		// catch for errors
	} catch (err) {
		// unique constraint error for Username
		if (err.name === "SequelizeUniqueConstraintError") {
			res.status(409).json("Username is not unique, please try again!");
			// alert("Username is not unique, please try again!");
			// error for password validation
		} else if (err.name === "SequelizeValidationError") {
			res
				.status(409)
				.json(
					"Password does not meet constraints (one uppercase letter, one lowercase letter, and one number)."
				);
			// alert("Password does not meet constraints (one uppercase letter, one lowercase letter, and one number.");
		} else {
			res.status(500).json(err);
		}
	}
});

module.exports = router;
