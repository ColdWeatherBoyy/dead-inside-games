const withAuth = (req, res, next) => {
	if (!req.session.loggedIn) {
		console.log(req.session);
		res.redirect("/login");
		// if logged in, should redirect homepage to /minesweeper, or to go to any other legal page
	} else {
		if (req.url === "/") {
			res.redirect("/minesweeper");
		} else {
			next();
		}
	}
};

module.exports = withAuth;
