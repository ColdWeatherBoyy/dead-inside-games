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

		if (response.ok) {
			document.location.replace("/minesweeper");
		} else {
			alert("Failed to sign up.");
		}
	} else {
		alert("Please enter a valid username and password.");
	}
};

document.querySelector("#signup-form").addEventListener("submit", signupFormHandler);
