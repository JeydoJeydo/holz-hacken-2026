const MATRIX_SIZE = 3;

function createMatrix() {
	let container = document.querySelector("#matrix");
	container.style.gridTemplateColumns = `repeat(${MATRIX_SIZE}, 1fr)`;
	container.style.gridTemplateRows = `repeat(${MATRIX_SIZE}, 1fr)`;

	for (let i = 0; i < MATRIX_SIZE * MATRIX_SIZE; i++) {
		let clone = container.querySelector(".clone").cloneNode(true);
		clone.classList.remove("clone");
		clone.setAttribute("index", i);
		container.appendChild(clone);
	}
}
createMatrix();

function changeBox(elem) {
	let el = elem;
	let index = el.getAttribute("index");
}

async function save() {
	let name = document.querySelector("#template_namer").value;
	if (name == undefined || name.length == 0) {
		console.warn("No name given");
		snackbar("No valid name given", true);
		//window.alert("No valid name given");
		return;
	}
	console.log("speichern ...", name);
	let container = document.querySelector("#matrix-container");
	let slots = container.querySelectorAll(".matrix-entry");
	let buildMatrix = { size: MATRIX_SIZE, name: name, slots: [], slotNumber: undefined };
	let buildSlotNumber = "";
	slots.forEach((el, i) => {
		if (el.classList.contains("clone")) {
			return;
		}
		let hasItem = el.checked || false;
		buildMatrix.slots.push(hasItem);
		buildSlotNumber += `${hasItem ? 1 : 0}`;
	});
	buildSlotNumber = parseInt(buildSlotNumber);
	buildMatrix.slotNumber = buildSlotNumber;
	console.log(buildSlotNumber, buildMatrix);

	try {
		let response = fetch("", {
			method: "POST",
		});
		let res = await response.json();
		if (!res.ok) {
			throw new Error("Server res. not ok.");
		}
		snackbar("Template saved");
		console.log(res);
	} catch (e) {
		console.error(e);
		snackbar("Error while uploading template", true);
	}
}
