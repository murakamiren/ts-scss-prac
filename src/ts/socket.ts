// console.log("he");

const txt = document.querySelector<HTMLInputElement>("#txt");
const btn = document.querySelector<HTMLInputElement>("#btn");
const list = document.querySelector<HTMLUListElement>("#msg");
const sock: WebSocket = new WebSocket("ws://127.0.0.1:8000");

sock.addEventListener("open", (e: any) => {
	console.log("open");

	console.log(e.data);
});

sock.addEventListener("message", (e: any) => {
	console.log("msg");

	console.log(e.data);
	list.innerHTML += `<li>${e.data}</li>`;
});

sock.addEventListener("close", (e: any) => {
	console.log("close");

	console.log(e.data);
});

sock.addEventListener("error", (e: any) => {
	console.log("err");

	console.log(e.data);
});

btn.addEventListener("click", () => {
	sock.send(txt.value);
});
