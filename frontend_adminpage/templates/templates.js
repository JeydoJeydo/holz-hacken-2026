function buildTemplatesView(data) {
	if (data == undefined) {
		console.error("No data given");
		return;
	}

	let container = document.querySelector("#templates");
	for (let i = 0; i < data.length; i++) {
		let clone = container.querySelector(".clone").cloneNode(true);
		let elem = data[i];
		clone.classList.remove("clone");
		clone.querySelector(".template-name").innerText = elem.name;
		clone.querySelector(".template-edit").href = `/?slotNumber=${elem.slotNumber}`;
		console.log(i, elem);
		let template = clone.querySelector(".template-view");
		template.style.gridTemplateColumns = `repeat(${elem.size}, 1fr)`;
		template.style.gridTemplateRows = `repeat(${elem.size}, 1fr)`;
		for (let j = 0; j < elem.slots.length; j++) {
			let templateSlotView = document.createElement("div");
			if (elem.slots[j]) {
				templateSlotView.classList.add("checked");
			}
			template.appendChild(templateSlotView);
		}
		container.appendChild(clone);
	}
}
let testData = [
	{
		id: "3c957ed6a5641",
		name: "Testtemplate",
		size: 3,
		slotNumber: 100010001,
		slots: [true, false, false, false, true, false, false, false, true],
	},
	{
		id: "7835f122c803f8",
		name: "Anoter Testtemplate",
		size: 3,
		slotNumber: 100010001,
		slots: [true, false, false, false, true, false, false, false, true],
	},
];
buildTemplatesView(testData);
