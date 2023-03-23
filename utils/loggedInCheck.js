const ifLoggedIn = (req, res, next) => {
	// check if logged in for login and signup ages
	if (req.session.loggedIn) {
		res.redirect("/minesweeper");
	} else {
		next();
	}
};

module.exports = ifLoggedIn;
