const form = document.querySelector("#signin-form");

let outgoing = false;
form.addEventListener("submit", event => {
	event.preventDefault();

	if (!outgoing) {
		signin(event);
	}
});

const signin = async (event) => {
	outgoing = true;
	try {
		const response = await fetch("/api/signin", {
			method: "POST",
			cache: 'no-cache',
			credentials: 'same-origin',
			redirect: 'follow',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: event.target[0].value,
				password: event.target[1].value,
			}),
		});
		const json = await response.json();
		console.log(json);
	} catch (error) {
		console.log(error);
	}
	outgoing = false;
};
