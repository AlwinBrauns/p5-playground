import socket from "./devsocket";
import p5 from "p5";
import pendelumSketch from "./pendelumSketch/pendelumSketch"
import starSketch from "./starSketch/starSketch"
import randomSketch from "./randomSketch/randomSketch";
import myNameSketch from "./myNameSketch/myNameSketch";

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
document.getElementById("btnMyName").addEventListener("click", () =>  switchSketchMap.myName())
document.getElementById("btnNull").addEventListener("click", () =>  switchSketchMap.null())

