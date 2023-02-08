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
		const res = await fetch("/api/signup", {
			method: "POST",
			body: {
				displayName: event.target[0].value,
				email: event.target[1].value,
				password: event.target[2].value,
			},
		});
		console.log(res);
	} catch (error) {
		console.log(error);
	}
	outgoing = false;
};
