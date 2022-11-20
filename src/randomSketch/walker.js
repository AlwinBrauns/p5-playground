export default class Walker {
    constructor(canvasWidth, canvasHeight, graphic, sketch) {
        this.width = canvasWidth;
        this.height = canvasHeight;
        this.graphic = graphic
        this.sketch = sketch
        this.initial();
    }
    initial() {
        this.points = [];
        this.x = this.width  / 2;
        this.y = this.height  / 2;
    }
    display() {
        this.graphic.stroke(255)
        for (let i = 0; i < this.points.length; i++) {
            const p = this.points[i];
            this.graphic.point(p.x, p.y)
        }
    }
    make(size, stepFunction) {
        this.points = []
        for(let i = 0; i<size;i++) {
            this.points.push(this.graphic.createVector(this.x,this.y))
            stepFunction()
        }
    }
    step(gravitateX = 0, gravitateY = 0) {
        this.x += this.sketch.random(-1,1) + gravitateX
        this.y += this.sketch.random(-1,1) + gravitateY
    }
    stepPercentage(propR = 0.5, propU = 0.5) {
        //bedingung => 50% = (propR + probL) = LR
        //bedingung => 50% = (propU + propD) = UD
        //bedingung => 100% = LR + UD
        propR = propR/2
        propU = propU/2
        const propL = 0.5-propR
        const propD = 0.5-propU

        const random = this.sketch.random(0,1);
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
        const choice = Math.floor(this.sketch.random(0, possibleChoices))
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