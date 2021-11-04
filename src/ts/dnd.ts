// console.log("hello");
const tomato = document.querySelector<HTMLDivElement>("#tomato");
const skyblue = document.querySelector<HTMLDivElement>("#skyblue");
const dropArea = document.querySelectorAll<HTMLDivElement>(".box-drag-container");
const onlineStatus = document.querySelector<HTMLParagraphElement>("#status");

const sock: WebSocket = new WebSocket("ws://127.0.0.1:5000");
// const dragArea2 = document.querySelector<HTMLDivElement>(".dr-2");
// const dropArea = document.querySelector<HTMLDivElement>("#drop-area");
const dragContent = [tomato, skyblue];

// const obj = { foo: "a", bar: "b" };
// const objJson = JSON.stringify(obj);

sock.addEventListener("open", (e: any) => {
	console.log("open");
	onlineStatus.innerText = "currently: online!";
});

sock.addEventListener("message", (e: any) => {
	console.log("msg");
	console.log(e.data);
	console.log(JSON.parse(e.data));
	const obj = JSON.parse(e.data);
	console.log(obj.content);
	const area = document.getElementById(obj.area);
	const content = document.getElementById(obj.content);
	area.appendChild(content);
	area.style.background = obj.content;
});

sock.addEventListener("close", (e: any) => {
	console.log("close");
	onlineStatus.innerText = "currently: offline";
});

sock.addEventListener("error", (e: any) => {
	console.log("err");
});

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
		const dropObj = { content: `${dragElem.id}`, area: `${elem.id}` };
		const dropObjJson = JSON.stringify(dropObj);
		sock.send(dropObjJson);
		elem.appendChild(dragElem);
	});
});
