const server = require("ws").Server;

const s = new server({ port: 5000 });

s.on("connection", (ws) => {
	console.log("connect");
	ws.on("message", (message) => {
		console.log(message);
		let decode = new Uint8Array(message);
		let msg = new TextDecoder().decode(decode);
		console.log(s);
		s.clients.forEach((client) => {
			client.send(msg);
		});
	});
});
