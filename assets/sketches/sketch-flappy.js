//object Oriented Collision
var rects = [];
var numRects = 10;
var frames_per_update = 2;  // every 2 frames update
var ship2;

class Ship{
  constructor(x,y,dia){
    this.x = x;
    this.y = y;
    this.color = color(random(255),random(255),random(255))
    this.dia = dia;
    this.vel = createVector(5,0);
    this.use_velocity = true;
    this.topBound =  0 + this.dia/4;
    this.bottomBound = height - this.dia/4;
  }

  update(){
    if(this.use_velocity){
    if (keyIsPressed === true) {
      //move upwards
      this.vel.y -= 2;
      if(this.vel.y < -14){
        this.vel.y = -14;
      }
      
    }else{
      //move downwards
      this.vel.y += 1;
      if(this.vel.y > 10){
        this.vel.y = 10;
      }
    }

    this.y += this.vel.y;
  }

  if(!this.use_velocity){
    if (keyIsPressed === true) {
      this.y -= 12;
    }else{
      this.y += 12;
    }
  }
    
    if(this.y < this.topBound){
      this.y = this.topBound;
    }
    if(this.y > this.bottomBound){
      this.y = this.bottomBound
    }
  }


	display(){
		noStroke();
		fill(this.color);
    ellipse(this.x,this.y,this.dia,this.dia);
    
    textSize(20);

    text("ship vel ("+this.use_velocity+"): " + this.vel.x + " " + this.vel.y, 30,30)
    text("ship x,y: " + this.x.toFixed(1) + " " + this.y.toFixed(1), 30,70)
	}

}

function setup() {
  var canvas = createCanvas(1000,300);
  canvas.parent('sketchcontainer');
  frameRate(60);


  ship2 = new Ship(width/3,height/2, 30);
	for(i=0;i<numRects;i++){
		r = new rectObj(random(width),random(height), random(10,50), random(10,50) ) // generate a rectObj
		rects.push(r); //add it to the array.
	}

}
function mouseClicked(){}

function draw(){
  background(255);
  
  textSize(20);
  text("Toggle velocity physics with 'a'", 10, 120)
  text("Toggle speed: with '1/2/3'", 10, 90)
  if(keyIsPressed){
    if( keyCode === 65){ // 'a'
      
    }
  }

  ///COLLISION
	for(i=0;i<numRects;i++){
		rects[i].disp();
    rects[i].collide( ship2 ); //collide against the circle object
	}

  if(frameCount % frames_per_update == 0){
    ship2.update();
  }
  ship2.display();
}


function keyPressed() { //32 is spacebar
  if (keyCode === 65) { //a
    this.ship2.use_velocity = !this.ship2.use_velocity;
  }
  
  if (keyCode === 49){ //2
    frames_per_update = 1;
  }
  if (keyCode === 50){ //2
    frames_per_update = 2;
  }
  if(keyCode === 51){ //3
    frames_per_update = 5;
  }
  // if(frames_per_update < ){
  //   frames_per_update = 5;
  // }
  // if(frames_per_update > 10){
  //   frames_per_update = 10;
  // }
}


function rectObj(x,y,w,h){
	this.x = x
	this.y = y
	this.w = w
	this.h = h
	this.color = color(random(255),random(255),random(255))
	this.hit = false;

	this.collide = function(obj){

		this.hit = collideRectCircle(this.x, this.y, this.w, this.h, obj.x, obj.y, obj.dia); //collide the cir object into this rectangle object.

		if(this.hit){
			this.color = color(0) //set this rectangle to be black if it gets hit
		}

	}

	this.disp = function(){
		noStroke();
		fill(this.color);
		this.x += 3 //move to the right!
		if(this.x > width){ //loop to the left!
			this.x = -this.w;
		}
		rect(this.x,this.y,this.w,this.h);

	}

}
