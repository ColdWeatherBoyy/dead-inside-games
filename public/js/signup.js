const signupFormHandler = async (event) => {
	event.preventDefault();

	const username = document.querySelector("#username").value.toLowerCase().trim();
	const password = document.querySelector("#password").value.trim();

	if (username && password) {
		console.log(username);
		const response = await fetch("/api/users/signup", {
			method: "POST",
			body: JSON.stringify({ username, password }),
			headers: { "Content-Type": "application/json" },
		});

		const data = await response.json();

		if (response.ok) {
			document.location.replace("/minesweeper");
		} else if (data === "Username is not unique.") {
			alert("Username is not unique, please try again!");
		} else if (data === "Password does not meet constraints.") {
			alert(
				"Password does not meet constraints (one uppercase letter, one lowercase letter, and one number)."
			);
		}
	} else {
		alert("You've gotta enter a username and password!");
	}
};

document.querySelector("#signup-form").addEventListener("submit", signupFormHandler);
