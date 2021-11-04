// console.log("hello");
var tomato = document.querySelector("#tomato");
var skyblue = document.querySelector("#skyblue");
var dropArea = document.querySelectorAll(".box-drag-container");
var onlineStatus = document.querySelector("#status");
var sock = new WebSocket("ws://127.0.0.1:5000");
// const dragArea2 = document.querySelector<HTMLDivElement>(".dr-2");
// const dropArea = document.querySelector<HTMLDivElement>("#drop-area");
var dragContent = [tomato, skyblue];
// const obj = { foo: "a", bar: "b" };
// const objJson = JSON.stringify(obj);
sock.addEventListener("open", function (e) {
    console.log("open");
    onlineStatus.innerText = "currently: online!";
});
sock.addEventListener("message", function (e) {
    console.log("msg");
    console.log(e.data);
    console.log(JSON.parse(e.data));
    var obj = JSON.parse(e.data);
    console.log(obj.content);
    var area = document.getElementById(obj.area);
    var content = document.getElementById(obj.content);
    area.appendChild(content);
    area.style.background = obj.content;
});
sock.addEventListener("close", function (e) {
    console.log("close");
    onlineStatus.innerText = "currently: offline";
});
sock.addEventListener("error", function (e) {
    console.log("err");
});
dragContent.forEach(function (elem) {
    elem.addEventListener("dragstart", function (e) {
        e.dataTransfer.setData("text", elem.id);
        // console.log("a");
    });
});
dropArea.forEach(function (elem) {
    elem.addEventListener("dragover", function (e) {
        e.preventDefault();
        // console.log("ss");
    });
    elem.addEventListener("drop", function (e) {
        e.preventDefault();
        var data = e.dataTransfer.getData("text");
        var dragElem = document.getElementById(data);
        var dropObj = { content: "" + dragElem.id, area: "" + elem.id };
        var dropObjJson = JSON.stringify(dropObj);
        sock.send(dropObjJson);
        elem.appendChild(dragElem);
    });
});
