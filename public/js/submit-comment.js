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
	const res = await fetch("/api/comment", {
		method: "POST",
		body: {
			post: {
				body: event.target[0].value,
			}
		}
	});
	event.target[0].value = null;
	outgoing = false;
	console.log(res);
}