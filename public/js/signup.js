const form = document.querySelector("#signup-form");


let outgoing = false;
form.addEventListener("submit", event => {
	event.preventDefault();

	if (!outgoing) {
		signup(event);
	}
});

const signup = async (event) => {
	outgoing = true;
	try {
		const response = await fetch("/api/signup", {
			method: "POST",
			method: "POST",
			cache: 'no-cache',
			credentials: 'same-origin',
			redirect: 'follow',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				displayName: event.target[0].value,
				email: event.target[1].value,
				password: event.target[2].value,
			}),
		});
		const json = await response.json();
		console.log(json);
	} catch (error) {
		console.log(error);
	}
	outgoing = false;
};
