import p5 from "p5";
import { canvasHeight, canvasWidth, fps } from "../constants";

export default function starSketch(s) {
  const stars = [];
  const fillUpStars = () => {
    for (let i = 0; i < 1000; i++) {
      stars.push({
        vector: s.createVector(Math.random() * canvasWidth, Math.random() * canvasHeight),
        distance: Math.random() * 255,
        direction_vector: s.createVector(0.5-1*Math.random(), 0.5-1*Math.random()),
        mass: (1-0.8*Math.random()) + (Math.random()<0.5?0.3:0) + (Math.random()<0.5?0.3:0) + (Math.random()<0.5?0.3:0) + (Math.random()<0.5?0.3:0)
      });
    }
  };
  s.setup = () => {
    s.createCanvas(canvasWidth, canvasHeight).parent("p5");
    s.frameRate(fps);
    fillUpStars();
  };
  s.draw = () => {
    s.background(10);  
    stars.forEach((star) => {
      s.strokeWeight(3*star.mass);
      stars.forEach((influencer) => {
        const difx = Math.abs(influencer.vector.x - star.vector.x);
        const dify = Math.abs(influencer.vector.y - star.vector.y);
        if( (difx < 100 && dify < 100) &&  (difx > 3*star.mass && dify > 3*star.mass) ) {
          const dv = p5.Vector.sub(star.vector, influencer.vector);
          dv.normalize()
          star.direction_vector.x = (star.direction_vector.x -= ((dv.x * influencer.mass)*0.01) / (difx<1?1:difx*Math.E))
          star.direction_vector.y = (star.direction_vector.y -= ((dv.y * influencer.mass)*0.01) / (dify<1?1:dify*Math.E))

          //star.direction_vector.normalize()
        }
      })
      const newX = (star.vector.x += star.direction_vector.x)
      const newY = (star.vector.y += star.direction_vector.y)
      star.vector.x = Math.abs( newX < 0 ? canvasWidth - newX : newX % canvasWidth);
      star.vector.y = Math.abs( newY < 0 ? canvasHeight - newY : newY % canvasHeight);
      s.stroke(Math.max(star.distance, 200), 150, Math.floor(255-star.distance/3));
      s.point(star.vector.x, star.vector.y);
    });
    
  };
};