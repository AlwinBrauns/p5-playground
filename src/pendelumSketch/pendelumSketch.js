import { canvasHeight, canvasWidth, fps } from "../constants";

export default function pendelumSketch(s) {
    s.setup = () => {
        s.createCanvas(canvasWidth, canvasHeight).parent("p5");
        s.frameRate(fps);
    }

    s.draw = () => {
        s.background(10);
        
    }
}