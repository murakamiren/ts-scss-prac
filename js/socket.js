// console.log("he");
var txt = document.querySelector("#txt");
var btn = document.querySelector("#btn");
var list = document.querySelector("#msg");
var sock = new WebSocket("ws://127.0.0.1:8000");
sock.addEventListener("open", function (e) {
    console.log("open");
    console.log(e.data);
});
sock.addEventListener("message", function (e) {
    console.log("msg");
    console.log(e.data);
    list.innerHTML += "<li>" + e.data + "</li>";
});
sock.addEventListener("close", function (e) {
    console.log("close");
    console.log(e.data);
});
sock.addEventListener("error", function (e) {
    console.log("err");
    console.log(e.data);
});
btn.addEventListener("click", function () {
    sock.send(txt.value);
});
