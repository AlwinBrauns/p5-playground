import { canvasHeight, canvasWidth, fps } from "../constants";

export default function randomSketch(s) {
    let graphic;
    const walkSize = 50000
    const changeOnSecond = 5

    class Walker {
        constructor(canvasWidth, canvasHeight) {
            this.width = canvasWidth;
            this.height = canvasHeight;
            this.initial();
        }
        initial() {
            this.points = [];
            this.x = this.width  / 2;
            this.y = this.height  / 2;
        }
        display() {
            graphic.stroke(255)
            for (let i = 0; i < this.points.length; i++) {
                const p = this.points[i];
                graphic.point(p.x, p.y)
            }
        }
        make(size, stepFunction) {
            this.points = []
            for(let i = 0; i<size;i++) {
                this.points.push(graphic.createVector(this.x,this.y))
                stepFunction()
            }
        }
        step(gravitateX = 0, gravitateY = 0) {
            this.x += s.random(-1,1) + gravitateX
            this.y += s.random(-1,1) + gravitateY
        }
        stepPercentage(propR = 0.5, propU = 0.5) {
            //bedingung => 50% = (propR + probL) = LR
            //bedingung => 50% = (propU + propD) = UD
            //bedingung => 100% = LR + UD
            propR = propR/2
            propU = propU/2
            const propL = 0.5-propR
            const propD = 0.5-propU

            const random = s.random(0,1);
            if(random<(0+propR)) {
                this.x++;
            }else if (random<0+propR+propL) {
                this.x--;
            }else if (random<0+propR+propL+propD) {
                this.y++;
            }else {
                this.y--;
            }
        }
        simpleStep() {
            const possibleChoices = 4;
            const choice = Math.floor(s.random(0, possibleChoices))
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
    const step = () => {
        walker.stepPercentage((s.mouseX/canvasWidth), 1-(s.mouseY/canvasHeight))
    }
    s.setup = () => {
        s.createCanvas(canvasWidth, canvasHeight).parent("p5");
        graphic = s.createGraphics(canvasWidth, canvasHeight)
        s.frameRate(fps);
        s.background(10);
        walker.make(walkSize, step);
        walker.display();
    }

    s.draw = () => {
        if((s.frameCount % (fps*changeOnSecond)) === 0){
            graphic.clear();
            s.background(10);
            walker.initial();
            walker.make(walkSize, step);
            walker.display();
        }
        s.image(graphic, 0, 0)
    }
}