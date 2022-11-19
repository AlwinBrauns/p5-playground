import socket from "./devsocket";
import p5 from "p5";
import pendelumSketch from "./pendelumSketch/pendelumSketch"
import starSketch from "./starSketch/starSketch"
import randomSketch from "./randomSketch/randomSketch";

let sketchInstance;

function switchSketch(sketch) {
    try {
        sketchInstance?.remove();
        sketchInstance = new p5(sketch);
    }catch(e) { console.log(e) }
}

switchSketch(null)

document.getElementById("btnStars").addEventListener("click", () => switchSketch(starSketch))
document.getElementById("btnPendelum").addEventListener("click", () => switchSketch(pendelumSketch))
document.getElementById("btnRandom").addEventListener("click", () => switchSketch(randomSketch))
document.getElementById("btnNull").addEventListener("click", () => switchSketch(null))

