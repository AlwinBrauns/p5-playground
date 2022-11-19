import { canvasHeight, canvasWidth, fps } from "../constants";

export default function randomSketch(s) {

    class Walker {
        constructor(canvasWidth, canvasHeight) {
            this.x = canvasWidth / 2;
            this.y = canvasHeight / 2;
        }
        display() {
            s.stroke(3);
            s.point(this.x,this.y);
        }
    }

    const walker = new Walker(s, canvasWidth, canvasHeight);

    s.setup = () => {
        s.createCanvas(canvasWidth, canvasHeight).parent("p5");
        s.frameRate(fps); 
    }

    s.draw = () => {
        s.background(10);
        walker.display();
    }
}