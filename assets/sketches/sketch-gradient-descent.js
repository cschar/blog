var data = [];

var m = 0;
var b = 0;

function setup() {
  // put setup code here
  var canvas = createCanvas(400,400);
  canvas.parent('sketchcontainer');
  background(51);
}

function drawLine() {
  var x1 = 0;
  var y1 = m * x1 + b;

  var x2 = 1;
  var y2 = m * x2 + b;

  x1 = map(x1, 0, 1, 0, width)
  y1 = map(y1, 0, 1, height, 0)
  x2 = map(x2, 0, 1, 0, width)
  y2 = map(y2, 0, 1, height, 0)
  
  stroke(150,200,170);
  strokeWeight(5);
  line(x1,y1,x2,y2)
}

function gradientDescent(){
  
  //The rate at which we are 
  // 'steering our car towards the target vector's car
  // Dont want to OVERsteer, go in wrong direction
  // then turn back.. OVERsteer, go in wrong direction etc..
  // similar in 'running along the 
  // looking for lowest valley spot etc.

  var learning_rate = 0.02;
  
  //look through all the data
  for( var i = 0; i < data.length; i++){
    var y = data[i].y;
    var x = data[i].x;
    var guess = m * x + b;
    var error = y - guess;
    // look at this datapoint!
    //I got an error!
    //Is it you M! is it you b!?!?
    //adjust m accoding to error AND input
    
    //error * x is actually the derivative
    // of the error with respect to x
    // where error is 

    // sum_of_all_points((guess - y)^2)
    var delta = (error *x) * learning_rate;
    m = m + delta
    //adjust b a ccording to error
    delta = (error) * learning_rate;
    b = b + delta
  }

  text("m,b,error of last data point: "
   + x.toFixed(2) + "  " + y.toFixed(2), 
   10,30)
  text("error: " + error.toFixed(3),
     10, 90);
     text("guess y=mx+b : " + guess.toFixed(3),
     10, 110);
    text("m: " + m.toFixed(4), 10, 50); 
    text("b: " + b.toFixed(4), 20, 70); 
}

function mousePressed(){
  var x = map(mouseX, 0, width, 0, 1);
  var y = map(mouseY, 0, height, 1, 0);
  console.log("pressed");
  var point = createVector(x,y);
  data.push(point);
}

function draw() {
   background(51);
    for( var i = 0; i < data.length; i++){
      var x = map(data[i].x, 0, 1, 0, width)
      var y = map(data[i].y, 0, 1, height, 0)

      fill(255);
      stroke(255);
      ellipse(x,y, 8,8)
    }
    if(data.length > 1){

      strokeWeight(1);
      textSize(19);
      gradientDescent();

      drawLine();
    }
    
}