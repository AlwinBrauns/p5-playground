import p5 from "p5";
import { canvasHeight, canvasWidth, fps } from "../constants";

export default function myNameSketch(s) {
    let font;
    let textPoints;
    let effect;

    s.preload = () => {
        font = s.loadFont("./fonts/LemonMilkMedium-mLZYV.otf")
    }

    s.setup = () => {
        s.createCanvas(canvasWidth, canvasHeight).parent("p5");
        s.frameRate(25);

        s.textFont(font);
        s.textSize(128);
        textPoints = font.textToPoints("Alwin Brauns", 100, 128)
    }

    s.draw = () => {
        s.background(10);
        s.stroke(50,255,50);
        if(s.frameCount % Math.floor(fps * 1.5) === 0){
            effect = s.createVector(canvasWidth/2, 128/2+20)
        }else {
        }
        for (let i = 0; i < textPoints.length; i++) {
            if(i>0) {
                const p_from = textPoints[i-1];
                const p_to = textPoints[i];
                if(
                    Math.abs(p_from.x-p_to.x)<20 &&
                    Math.abs(p_from.y-p_to.y)<20
                ){
                    s.strokeWeight(Math.random()*1+2)
                    if(
                        Math.abs(p_from.x-s.mouseX)<40 &&
                        Math.abs(p_from.y-s.mouseY)<40
                    ){
                        s.line(
                            p_from.x, 
                            p_from.y, 
                            s.mouseX, 
                            s.mouseY
                        )
                    }else if (effect && Math.abs(p_from.x-effect.x)<40 &&
                    Math.abs(p_from.y-effect.y)<40) {
                        s.line(
                            p_from.x, 
                            p_from.y, 
                            effect.x, 
                            effect.y
                        )
                        const mouse = s.createVector(s.mouseX, s.mouseY)
                        const moveTo = p5.Vector.sub(mouse, s.createVector(canvasWidth/2, 128/2+20))
                        moveTo.normalize()
                        effect.x += moveTo.x
                        effect.y += moveTo.y
                    } else {
                        s.line(
                            p_from.x, 
                            p_from.y, 
                            p_to.x, 
                            p_to.y
                        )
                    }
                    
                }
            }
        }
    }
}