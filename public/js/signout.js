
{

	let outgoing = false;
	const eventListener = event => {
		event.preventDefault();

		if (!outgoing) {
			signout();
		}
	};

	document.querySelector("#signout").addEventListener("click", eventListener);

	const signout = async () => {
		outgoing = true;
		try {
			const response = await fetch("/api/signout", {
				method: "DELETE",
				cache: 'no-cache',
				credentials: 'same-origin',
				redirect: 'follow',
				headers: {
					"Content-Type": "application/json",
				},
			});
			const json = await response.json();
			console.log(json);
			if(response.status === 200) {
				window.location.reload();
			}
		} catch (error) {
			console.log(error);
		}
		outgoing = false;
	};
}
