import p5 from "p5";
import { canvasHeight, canvasWidth, fps } from "../constants";

export default function randomSketch(s) {
    let graphic;
    const walkSize = 5000
    const changeOnSecond = 5
    const smallerWindowAxse =  Math.min(canvasHeight, canvasWidth)

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

    s.setup = () => {
        s.createCanvas(canvasWidth, canvasHeight).parent("p5");
        graphic = s.createGraphics(canvasWidth, canvasHeight)
        s.frameRate(fps);
        walker.make(walkSize, () => walker.simpleStep());
        walker.display();
    }
    s.draw = () => {
        s.background(10);

        
        s.noFill()
        s.stroke(255)
        s.strokeWeight(1)
        s.ellipse(canvasWidth/2, canvasHeight/2, smallerWindowAxse, smallerWindowAxse)


        const centerVector = s.createVector(canvasWidth/2, canvasHeight/2)
        const mouseVector = s.createVector(s.mouseX, s.mouseY)
        const difVector = p5.Vector.sub(centerVector, mouseVector)
        const propR = Math.max(0, Math.min(1,(0.5-difVector.x/smallerWindowAxse))) 
        const propU = Math.max(0, Math.min(1,1-(0.5-difVector.y/smallerWindowAxse)))
        s.line(centerVector.x, centerVector.y, mouseVector.x, mouseVector.y)
        s.ellipse(mouseVector.x, mouseVector.y, 100,100)
        s.fill(255,255,255)
        s.text("Vector (Center/\\Mouse): " + difVector.x + " - " + difVector.y, 0, 14)
        s.text(
            "P: " + propR
            + " - " 
            +  propU
            , 0, 28
        )

        if((s.frameCount % (fps*changeOnSecond)) === 0){
            graphic.clear();
            s.background(10);
            walker.initial();
            walker.make(walkSize, () => walker.stepPercentage(
                propR, 
                propU
            ));
            walker.display();
        }
        

        s.image(graphic, 0, 0)

    }
}