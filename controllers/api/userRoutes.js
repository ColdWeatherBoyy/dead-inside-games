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
			req.session.user_id = newUser.id;
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

// login route for users
router.post("/login", async (req, res) => {
	try {
		const userData = await User.findOne({
			where: { unique_username: req.body.username },
		});

		// checks if userData is found
		if (!userData) {
			// add back in when working with site
			// alert("Username not found, please try again.");
			return res.status(404).json({ message: "Username not found, please try again." });
		}

		const validPassword = userData.checkPassword(req.body.password);

		if (!validPassword) {
			// add back in when working with site
			// alert("Password does not match, please try again.");
			return res
				.status(404)
				.json({ message: "Password does not match, please try again." });
		}

		req.session.save(() => {
			req.session.username = userData.username;
			req.session.user_id = userData.id;
			req.session.loggedIn = true;

			res.status(200).json({ message: "Logged in and ready to die (inside only)." });
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// request get all users for testing
router.get("/", async (req, res) => {
	const userData = await User.findAll({
		attributes: { exclude: ["password"] },
	});

	const users = userData.map((user) => user.get({ plain: true }));

	res.status(200).json(users);
});

module.exports = router;
