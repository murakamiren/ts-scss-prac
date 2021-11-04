var server = require("ws").Server;
var s = new server({ port: 5000 });
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
