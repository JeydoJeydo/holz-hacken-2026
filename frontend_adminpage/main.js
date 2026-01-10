function snackbar(msg, isError = false) {
	let snackbar = document.querySelector("#snackbar");
	let snackbarText = snackbar.querySelector("#snackbar-text");

	snackbarText.innerText = msg;
	snackbar.style.transform = "translate(-50%, 0px)";
	snackbar.style.opacity = 1;

	if (isError) {
		snackbar.style.backgroundColor = "var(--red)";
	} else {
		snackbar.style.backgroundColor = "var(--white)";
	}
	setTimeout(
		() => {
			snackbar.style.transform = "translate(-50%, var(--margin))";
			snackbar.style.opacity = 0;
		},
		isError ? 5000 : 2000
	);
}
