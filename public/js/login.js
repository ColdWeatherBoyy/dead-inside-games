const loginFormHandler = async (event) => {
	event.preventDefault();

	const username = document.querySelector("#username-login").value.toLowerCase();
	const password = document.querySelector("#password-login").value.trim();

	if (username && password) {
		const response = await fetch("/api/users/login", {
			method: "POST",
			body: JSON.stringify({ username, password }),
			headers: { "Content-Type": "application/json" },
		});

		const data = await response.json();

		if (response.ok) {
			document.location.replace("/minesweeper");
		} else if (data === "Username not found.") {
			alert("Username not found, please try again.");
		} else if (data === "Password does not match.") {
			alert("Password does not match, please try again.");
		}
	} else {
		alert("You've gotta enter a username and password!");
	}
};

document.querySelector("#login-form").addEventListener("submit", loginFormHandler);
