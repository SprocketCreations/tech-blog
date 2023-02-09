{
	const form = document.querySelector("#new-post-form")

	let outgoing = false;
	form.addEventListener("submit", event => {
		event.preventDefault();

		if (!outgoing) {
			sendPost(event);
		}
	});

	const sendPost = async event => {
		outgoing = true;
		try {
			const response = await fetch("/api/blogpost", {
				method: "POST",
				cache: 'no-cache',
				credentials: 'same-origin',
				redirect: 'follow',
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					post: {
						title: event.target[0].value,
						body: event.target[1].value,
					},
				}),
			});
			const json = await response.json()
			console.log(json);

			//Redirect the user to the post's page
			if (response.status === 201) {
				const url = `/post/${json.post.id}`;
				document.location.href = url;
			} else if (json.alert) {
				alert(json.alert);
			} else {
				alert(json.message);
			}
		} catch (error) {
			console.log(error);
		}
		outgoing = false;
	};
}