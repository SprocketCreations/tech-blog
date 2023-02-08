const form = document.querySelector("#submit-comment-form");

let outgoing = false;

form.addEventListener("submit", event => {
	event.preventDefault();

	if (!outgoing) {
		postComment(event);
	}
});

const postComment = async (event) => {
	outgoing = true;
	try {
		const response = await fetch("/api/comment", {
			method: "POST",
			method: "POST",
			cache: 'no-cache',
			credentials: 'same-origin',
			redirect: 'follow',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				post: {
					body: event.target[0].value,
				}
			}),
		});
		const json = response.json();
		console.log(json);
		event.target[0].value = null;
	} catch (error) {
		console.log(error);
	}
	outgoing = false;
}