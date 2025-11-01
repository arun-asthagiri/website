
let numBots = 50;

let bots = []

let car;

function setup() {
  createCanvas(500, 500);
  for (i = 0; i < numBots; i++){
    bots.push(new Bot());
    if (i == 0){
      bots[i].size = 80;
    } else {
      bots[i].size = bots[i-1].size * 0.9;
    }
  }
  
  car = new Car();
}



function draw() {
  background(255);
  for (i = 0; i < numBots; i++){
    
    bots[i].move();
    if (i > 5){ // don't visualize the bots very close to the car
      bots[i].draw();  
    }
    
    if (i == 0){
      bots[i].setTarget(car.x, car.y);
    } else {
      bots[i].setTarget(bots[i-1].x, bots[i-1].y);
    }
  }
  
  car.draw();
  car.move();
  
}

// function keyPressed(){
//   if (keyCode === LEFT_ARROW){
//     car.move([-1,0]);
//   } else if (keyCode === RIGHT_ARROW){
//     car.move([0,1]);
//   }
// }

function Car(){
  this.x = mouseX;
  this.y = mouseY;
  this.size = 10;
  
  this.targetX = 50;
  this.targetY = 50;
  
  this.speed = 0.7; // speed>0
  this.interp_amount = -0.5+1/(1+exp(-this.speed));
  
  this.draw = function(){
    
    push();
    fill(0);
    ellipse(this.x, this.y, this.size,this.size);
  
    pop();
  }
  
  this.move = function(){
    grace_length = 100;
    if ((mouseX < width+grace_length && mouseX > -grace_length) && (mouseY < height+grace_length && mouseY > -grace_length)){
      this.targetX = mouseX;
      this.targetY = mouseY;
    } else {
      this.targetX =  constrain(width*noise(0.007*frameCount), 0, width);
      this.targetY =  constrain(height* noise(0.009*frameCount+50000), 0, height);
    }
    
    this.moveX = noiseX+constrain(lerp(0, this.targetX-this.x, this.interp_amount), -70, 70);
    this.moveY = noiseY+constrain(lerp(0, this.targetY-this.y, this.interp_amount), -70, 70);
    this.x += this.moveX;
    this.y += this.moveY;
  }
  
}
  

function Bot(){
  this.x = random(width);
  this.y = random(height);
  this.size = 20;
  this.speed = 0.5; // speed>0
  this.interp_amount = -0.5+1/(1+exp(-this.speed)); // sigmoid
  
  this.targetX = 50;
  this.targetY = 50;
  this.setTarget = function(x, y){
    this.targetX = x;
    this.targetY = y;
  }
  this.move = function(){
    noiseX = 1*(noise(0.005 * frameCount) - 0.5) 
    noiseY = 1*(noise(0.005 * frameCount+1000) - 0.5)
    this.moveX = noiseX+constrain(lerp(0, this.targetX-this.x, this.interp_amount), -50, 50);
    this.moveY = noiseY+constrain(lerp(0, this.targetY-this.y, this.interp_amount), -50, 50);
    this.x += this.moveX;
    this.y += this.moveY;
  }
  this.draw = function(){
    push();
    fill(255,255,255,90);
    ellipse(this.x, this.y, this.size,this.size);
    pop();
  }
}