import socket from "./devsocket";
import p5 from "p5";
import pendelumSketch from "./pendelumSketch/pendelumSketch"
import starSketch from "./starSketch/starSketch"
import randomSketch from "./randomSketch/randomSketch";
import myNameSketch from "./myNameSketch/myNameSketch";
import noiseSketch from "./noiseSketch.js/noiseSketch";

let sketchInstance;

function switchSketch(sketch, view) {
    try {
        let url = new URL(window.location.origin)
        url.searchParams.set("view",view)
        window.history.replaceState(null,null,url.search)
        sketchInstance?.remove();
        sketchInstance = new p5(sketch);
    }catch(e) { console.log(e) }
}


const switchSketchMap = {
    null: () => switchSketch(null, "null"),
    stars: () => switchSketch(starSketch, "stars"),
    pendelum: () => switchSketch(pendelumSketch, "pendelum"),
    random: () => switchSketch(randomSketch, "random"),
    noise: () => switchSketch(noiseSketch, "noise"),
    myName: () => switchSketch(myNameSketch, "myName"),
}

function onLoad() {
    const url = new URL(window.location.toString())
    const view = url.searchParams.get("view")
    if(view) {
        switchSketchMap[view]()
    }else {
        switchSketchMap.null()
    }
}

onLoad();

document.getElementById("btnStars").addEventListener("click", () => switchSketchMap.stars())
document.getElementById("btnPendelum").addEventListener("click", () => switchSketchMap.pendelum())
document.getElementById("btnRandom").addEventListener("click", () =>  switchSketchMap.random())
document.getElementById("btnNoise").addEventListener("click", () =>  switchSketchMap.noise())
document.getElementById("btnMyName").addEventListener("click", () =>  switchSketchMap.myName())
document.getElementById("btnNull").addEventListener("click", () =>  switchSketchMap.null())

const dragger = document.querySelector(".dragger")
const dropLeft = document.querySelector("#drop-left")
const dropRight = document.querySelector("#drop-right")
const dropTop = document.querySelector("#drop-top")
const dropBottom = document.querySelector("#drop-bottom")
const moveArea = document.querySelector("#move-area")
const header = document.getElementsByTagName("header")[0]
dragger.addEventListener("dragstart", (event) => {
    moveArea.appendChild(header)
    header.style.position = "fixed";
    event.dataTransfer.setDragImage(new Image(), 0,0)
})
dragger.addEventListener("drag", (event) => {
    if(event.y>0) {
        header.style.left = event.clientX - event.target.clientWidth + "px";
        header.style.top = event.clientY - event.target.offsetTop - event.target.clientHeight/2 + "px";
    }
    dropLeft.style.pointerEvents = "all";
    dropRight.style.pointerEvents = "all";
    dropTop.style.pointerEvents = "all";
    dropBottom.style.pointerEvents = "all";
})
dragger.addEventListener("dragend", (event) => {
    dropLeft.style.pointerEvents = null;
    dropRight.style.pointerEvents = null;
    dropTop.style.pointerEvents = null;
    dropBottom.style.pointerEvents = null;
})
function dragAreaDragOver(event) {
    event.preventDefault();
}
function dragAreaDrop(event) {
    event.preventDefault();
    console.log(event.dataTransfer)
    event.target.appendChild(header)
    header.style.left = null;
    header.style.top = null;
}
dropLeft.addEventListener("dragover", dragAreaDragOver)
dropLeft.addEventListener("drop", dragAreaDrop)
dropRight.addEventListener("dragover", dragAreaDragOver)
dropRight.addEventListener("drop", dragAreaDrop)
dropTop.addEventListener("dragover", dragAreaDragOver)
dropTop.addEventListener("drop", dragAreaDrop)
dropBottom.addEventListener("dragover", dragAreaDragOver)
dropBottom.addEventListener("drop", dragAreaDrop)