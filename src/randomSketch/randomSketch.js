import p5 from "p5";
import { canvasHeight, canvasWidth, fps } from "../constants";
import Walker from "./walker";



export default function randomSketch(s) {
    let walker;
    let graphic;
    const walkSize = 5000
    const changeOnSecond = 5
    const smallerWindowAxse =  Math.min(canvasHeight, canvasWidth)

    s.setup = () => {
        s.createCanvas(canvasWidth, canvasHeight).parent("p5");
        graphic = s.createGraphics(canvasWidth, canvasHeight)
        walker = new Walker(canvasWidth, canvasHeight, graphic, s);
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