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

		if (response.ok) {
			document.location.replace("/minesweeper");
		} else {
			alert("Failed to log in.");
		}
	} else {
		alert("You have to enter a username and password!");
	}
};

document.querySelector("#login-form").addEventListener("submit", loginFormHandler);
