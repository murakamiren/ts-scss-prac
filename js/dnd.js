// console.log("hello");
var tomato = document.querySelector("#tomato");
var skyblue = document.querySelector("#skyblue");
var dropArea = document.querySelectorAll(".box-drag-container");
// const dropArea = document.querySelector<HTMLDivElement>("#drop-area");
var dragContent = [tomato, skyblue];
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
        elem.appendChild(dragElem);
    });
});
