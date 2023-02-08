const form = document.querySelector("#signin-form");

let outgoing = false;
form.addEventListener("submit", event => {
	event.preventDefault();

	if(!outgoing) {
		signin(event);
	}
});

const signin = async (event) => {
	outgoing = true;
	const res = await fetch("/api/signin", {
		method: "POST",
		body: {
			email: event.target[0].value,
			password: event.target[1].value,
		},
	});
	console.log(res);
	outgoing = false;
};
