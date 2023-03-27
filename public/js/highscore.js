const highscoreButton = document.querySelector(".modal-button");
const closeButton = document.querySelector("#close-button");
const overlay = document.getElementById("overlay");
const modal = document.querySelector("#modal");

highscoreButton.addEventListener("click", () => {
	console.log("hi");
	openModal(modal);
});

closeButton.addEventListener("click", () => {
	closeModal(modal);
});

function openModal(modal) {
	modal.classList.add("active");
	overlay.classList.add("active");
}

function closeModal(modal) {
	modal.classList.remove("active");
	overlay.classList.remove("active");
}

highscoreEL.addEventListener("click", async () => {
	try {
		const response = await fetch("/api/minesweeper", {
			method: "POST",
			body: JSON.stringify({ score: timeRemaining }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.ok) {
			const responseData = await response.json();
			console.log(responseData);
			highscoreEL.classList.add("is-hidden");
		} else {
			console.error("Error:", response.status);
		}
	} catch (err) {
		console.error("Error:", err);
	}
});

async function updateHighscores() {
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

		const username = req.session.username;

		// grabs the data values only
		const highscores = highscoreData.map((highscore) => highscore.get({ plain: true }));

		res.render("minesweeperhighscores", {
			highscores,
			username: username,
			placeholderImage,
			loggedIn: req.session.loggedIn,
		});
	} catch (err) {
		console.lerror("Error:", err);
	}
}
