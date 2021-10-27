// console.log("hello");
const tomato = document.querySelector<HTMLDivElement>("#tomato");
const skyblue = document.querySelector<HTMLDivElement>("#skyblue");
const dropArea = document.querySelectorAll<HTMLDivElement>(".box-drag-container");
// const dropArea = document.querySelector<HTMLDivElement>("#drop-area");
const dragContent = [tomato, skyblue];

dragContent.forEach((elem) => {
	elem.addEventListener("dragstart", (e) => {
		e.dataTransfer.setData("text", elem.id);
		// console.log("a");
	});
});

dropArea.forEach((elem) => {
	elem.addEventListener("dragover", (e) => {
		e.preventDefault();
		// console.log("ss");
	});

	elem.addEventListener("drop", (e) => {
		e.preventDefault();
		let data = e.dataTransfer.getData("text");
		let dragElem = document.getElementById(data);
		elem.appendChild(dragElem);
	});
});
