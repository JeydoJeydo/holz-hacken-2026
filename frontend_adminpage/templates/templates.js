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
		clone.querySelector(".template-edit").href = `/?id=${elem.id}`;
		console.log(i, elem);
		let template = clone.querySelector(".template-view");
		template.style.gridTemplateColumns = `repeat(${elem.size}, 1fr)`;
		template.style.gridTemplateRows = `repeat(${elem.size}, 1fr)`;
		for (let j = 0; j < elem.slotNumber.toString().length; j++) {
			let templateSlotView = document.createElement("div");
			if (elem.slotNumber.toString()[j] !== "0") {
				templateSlotView.classList.add("checked");
			}
			template.appendChild(templateSlotView);
		}
		container.appendChild(clone);
	}
}

async function getTemplates(){
	try{
		let res = await fetch("http://192.168.137.103:5000/backend/v1/templates");
		let templates = await res.json();
		buildTemplatesView(templates);
	}catch(e){
		console.error(e);
	}
}
getTemplates();
