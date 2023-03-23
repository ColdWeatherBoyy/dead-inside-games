const withAuth = (req, res, next) => {
	if (!req.session.loggedIn) {
		res.redirect("/login");
		// if logged in, should redirect homepage to /minesweeper, or to go to any other allowed page
	} else {
		if (req.url === "/") {
			res.redirect("/minesweeper");
		} else {
			next();
		}
	}
};

module.exports = withAuth;
