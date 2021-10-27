// console.log("hello");
var server = require("ws").Server;
console.log(server);
var s = new server({ port: 8000 });
s.on("connection", function (ws) {
    console.log("connect");
    ws.on("message", function (message) {
        console.log(message);
        var decode = new Uint8Array(message);
        var msg = new TextDecoder().decode(decode);
        console.log(s);
        s.clients.forEach(function (client) {
            client.send(msg);
        });
    });
});
