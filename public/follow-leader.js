
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
    if (i > 5){
      bots[i].draw();  
    }
    
    if (i == 0){
      bots[i].setTarget(car.x, car.y);
    } else {
      bots[i].setTarget(bots[i-1].x, bots[i-1].y);
    }
  }
  
  car.draw();
  // car.move();
  
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
  
  this.draw = function(){
    // this.x=mouseX;
    // this.y=mouseY;
    this.x = constrain(mouseX, 0, width);
    this.y = constrain(mouseY, 0, height);
    push();
    fill(0);
    ellipse(this.x, this.y, this.size,this.size);
  
    pop();
  }
  
//   this.move = function(moveTuple){
//     if (keyIsDown(LEFT_ARROW) === true) {
//       this.x -= 1;
//     }
//     if (keyIsDown(RIGHT_ARROW) === true) {
//       this.x += 1;
//     }
//     if (keyIsDown(UP_ARROW) === true) {
//       this.y -= 1;
//     }
//     if (keyIsDown(DOWN_ARROW) === true) {
//       this.y += 1;
//     }
//   }

}

function Bot(){
  this.x = random(width);
  this.y = random(height);
  this.size = 20;
  this.speed = 0.5; // speed>0
  this.interp_amount = -0.5+1/(1+exp(-this.speed));
  
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