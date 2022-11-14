import p5 from "p5";

const sketch = (s) => {
  const fps = 60;
  const canvasHeight = window.innerHeight;
  const canvasWidth = window.innerWidth;
  const stars = [];
  const fillUpStars = () => {
    for (let i = 0; i < 1000; i++) {
      stars.push({
        vector: s.createVector(Math.random() * canvasWidth, Math.random() * canvasHeight),
        distance: Math.random() * 255,
        direction_vector: s.createVector(0.5-1*Math.random(), 0.5-1*Math.random()),
        mass: 1*Math.random() + (Math.random()<0.5?1:0)
      });
    }
  };
  s.setup = () => {
    s.createCanvas(canvasWidth, canvasHeight).parent("p5");
    s.frameRate(fps);
    fillUpStars();
  };
  s.draw = () => {
    s.background(0);
    s.strokeWeight(3);
    stars.forEach((star) => {
      stars.forEach((influencer) => {
        const difx = Math.abs(influencer.vector.x - star.vector.x);
        const dify = Math.abs(influencer.vector.y - star.vector.y);
        if( (difx < 100 && dify < 100) &&  (difx > 3 && dify > 3) ) {
          const dv = p5.Vector.sub(star.vector, influencer.vector);
          dv.normalize()
          star.direction_vector.x -= ((dv.x * influencer.mass)*1) / (difx<1?1:difx*4)
          star.direction_vector.y -= ((dv.y * influencer.mass)*1) / (dify<1?1:dify*4)
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

const sketchInstance = new p5(sketch);
