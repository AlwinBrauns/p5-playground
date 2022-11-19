import { canvasHeight, canvasWidth, fps } from "../constants";

export default function randomSketch(s) {

    class Walker {
        constructor(canvasWidth, canvasHeight) {
            this.x = canvasWidth / 2;
            this.y = canvasHeight / 2;
        }
        display() {
            s.stroke(255)
            s.point(this.x, this.y)
        }
        step() {
            const possibleChoices = 4;
            const choice = Math.floor(Math.random()*(possibleChoices+1))
            switch (choice) {
                case 0:
                    this.x++;
                break;
                case 1:
                    this.x--;
                break;
                case 2:
                    this.y++;
                break;
                case 3:
                    this.y--;
                break;
            }
        }
    }

    const walker = new Walker(canvasWidth, canvasHeight);

    s.setup = () => {
        s.createCanvas(canvasWidth, canvasHeight).parent("p5");
        s.frameRate(fps); 
    }

    s.draw = () => {
        s.background(10);
        walker.display();
        walker.step();
    }
}