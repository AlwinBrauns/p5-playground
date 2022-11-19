import { canvasHeight, canvasWidth, fps } from "../constants";

export default function randomSketch(s) {

    class Walker {
        once = true;
        constructor(canvasWidth, canvasHeight) {
            this.x = canvasWidth / 2;
            this.y = canvasHeight / 2;
        }
        display() {
            s.stroke(255)
            for (let i = 0; i < this.points.length; i++) {
                const p = this.points[i];
                s.point(p.x, p.y)
            }
        }
        make(size) {
            this.points = []
            for(let i = 0; i<size;i++) {
                this.points.push({x: this.x, y: this.y})
                this.step()
            }
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
        walker.make(500);
    }

    s.draw = () => {
        s.background(10);
        walker.display();
    }
}