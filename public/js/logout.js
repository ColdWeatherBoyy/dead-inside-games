//Needs to be tested
const logout = async () => {
	const response = await fetch("/api/users/logout", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
	});

	if (response.ok) {
		document.location.replace("/");
	} else {
		alert("Unable to Logout.");
	}
};
document.querySelector("#logout").addEventListener("click", logout);
