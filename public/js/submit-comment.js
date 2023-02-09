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
					body: event.target[1].value,
					blogPostId: event.target[0].value,
				}
			}),
		});
		const json = await response.json();
		console.log(json);
		document.location.reload();
	} catch (error) {
		console.log(error);
	}
	outgoing = false;
}