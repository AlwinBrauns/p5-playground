import p5 from "p5";

export default function pendelumSketch(s) {
    const fps = 60;
    const canvasHeight = window.innerHeight;
    const canvasWidth = window.innerWidth;

    s.setup = () => {
        s.createCanvas(canvasWidth, canvasHeight).parent("p5");
        s.frameRate(fps);
    }

    s.draw = () => {
        s.background(10);
        
    }
}