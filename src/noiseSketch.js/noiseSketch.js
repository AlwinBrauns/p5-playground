import { canvasHeight, canvasWidth, fps } from "../constants";

export default function noiseSketch(s) {
    let xoff = 0.01;
    let noiseX = 0;

    s.setup = () => {
        s.createCanvas(canvasWidth, canvasHeight).parent("p5");
        s.frameRate(fps);
    }

    s.draw = () => {
        s.background(10);
        s.noFill();
        s.beginShape();
        for (let x = 0; x < canvasWidth; x++) {
            noiseX += xoff;
            s.stroke(255,0,0, 100);
            s.vertex(x, s.random(canvasHeight))
        }
        s.endShape();
        s.beginShape();
        for (let x = 0; x < canvasWidth; x++) {
            noiseX += xoff;
            s.stroke(0,255,0);
            s.vertex(x, s.noise(noiseX)*canvasHeight)
        }
        s.endShape();
        s.noLoop();
    }
}