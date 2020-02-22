
function Particle(){
  this.x = 100;
  this.y = 100;
}
Particle.prototype.show = function(){
  ellipse(this.x, this.y, 30,30)
}

class Neuron {
 
  constructor(x, y) {
    this.location = createVector(x, y);
    this.connections = [];
    this.sum = 0;
  }

  addConnection(c){
    this.connections.push(c);
  }

  toString(){
    return "neruon" + this.location.x + " " + this.location.y;
  }
 
  display() {
    push();
    strokeWeight(2);
    stroke(230,100,100);
    fill(230,100,100,100);
    // noFill();
    // let radius = this.sum * 20;
    let radius = 16 + (this.sum * 30);
    ellipse(this.location.x, this.location.y, radius, radius);
    
    fill(0);
    stroke(0);
    strokeWeight(1);
    textSize(16);
    text("" + this.sum.toFixed(3), this.location.x, this.location.y-20)
    pop();

    for (let c of this.connections) {
      c.display();
    }
  }

  feedforward(input){
    this.sum += input;

    if(this.sum > 1){
      this.fire();
      this.sum = 0;
    }
  }

  fire(){
    for (let c of this.connections){
      c.feedforward(this.sum);
    }
  }
}

class Connection {
  constructor(from, to, weight){
    this.weight = weight;
    this.from = from;
    this.to = to;
    this.sending = false;
    this.sender = null;
    this.output = 0;
  }

  update(){
    if(this.sending){
    
      this.sender.x = lerp(this.sender.x,
      this.to.location.x, 0.1);

      this.sender.y = lerp(this.sender.y,
        this.to.location.y, 0.1);

        //how far are we from receiver neuron
      let d = this.sender.dist(this.to.location);
      
      //if were 1 pixel close,
      // turn off sending
      if (d < 1){
        
        this.to.feedforward(this.output);
        this.sending = false;
      }
    }
  }

  feedforward(val){
    //dont send right away, trigger animation
    // this.to.feedforward(val*this.weight);

    this.sending = true;
    this.sender = createVector(this.from.location.x,
      this.from.location.y);
    this.output = val*this.weight;
  }

  display(){
    stroke(100,140,100);
    strokeWeight(this.weight*5);
    line(this.from.location.x,
     this.from.location.y,
     this.to.location.x,
     this.to.location.y);

    if(this.sending){
      fill(0);
      strokeWeight(1);
      ellipse(this.sender.x, this.sender.y, 16, 16)
    }
  }
}

class Network {
  //ArrayList<Neuron> neurons;
  //PVector location;
 
  constructor(x, y) {
    this.location = createVector(x,y);
    this.neurons = [];
  }

  // feedforward
  feedforward(input, input2, input3){
    let start = this.neurons[0];
    let start2 = this.neurons[1];
    let start3 = this.neurons[2];
    start.feedforward(input);
    start2.feedforward(input2);
    start3.feedforward(input3);
    

  }

  addNeuron(n) {
    this.neurons.push(n);
  }

  connect(a, b){
    let c = new Connection(a, b, random(1));
    a.addConnection(c);

  }

  update(){
    for( let n of this.neurons){
      for( let c of n.connections){
        c.update();
      }
    }
  }

  display() {
    push(); //start new drawing state
    translate(this.location.x, this.location.y);
    for (let n of this.neurons) {
      n.display();
    }
    pop(); //restore original state
  }

}

function setup() {
  // put setup code here
  var canvas = createCanvas(640,360);
  canvas.parent('sketchcontainer');
  background(255);

  // this.n = new Neuron(50,50)
  this.network = new Network(width/2,
    height/2);

  this.n00 = new Neuron(-200, -100);
  this.n0 = new Neuron(-200, 0);
  this.n1 = new Neuron(-200, 100);
  this.n2 = new Neuron(0, -100);
  this.n3 = new Neuron(0, 100);
  this.n4 = new Neuron(200, 100);
  this.n5 = new Neuron(200, -100);
  this.n6 = new Neuron(300, 0);


  this.network.addNeuron(this.n00);
  this.network.addNeuron(this.n0);
  this.network.addNeuron(this.n1);
  this.network.addNeuron(this.n2);
  this.network.addNeuron(this.n3);
  this.network.addNeuron(this.n4);
  this.network.addNeuron(this.n5);
  this.network.addNeuron(this.n6);


  // this.network.connect(this.n1, this.n4);
  this.network.connect(this.n00, this.n2);
  this.network.connect(this.n00, this.n3);
  this.network.connect(this.n0, this.n2);
  this.network.connect(this.n0, this.n3);
  this.network.connect(this.n1, this.n2);
  this.network.connect(this.n1, this.n3);
  this.network.connect(this.n2, this.n4);
  this.network.connect(this.n3, this.n4);
  this.network.connect(this.n2, this.n5);
  this.network.connect(this.n3, this.n5);
  this.network.connect(this.n4, this.n6);
  this.network.connect(this.n5, this.n6);
  
}

let fedVal = "";
let fedVal2 = "";
let fedVal3 = "";

function draw() {
  // put drawing code here
  background(255);
  this.network.update();
  this.network.display();
  
  if(frameCount % 30 == 0){
    let v = random(0.6)
    let v2 = random(0.6)
    let v3 = random(0.6)
    this.network.feedforward(v,v2,v3)

    fedVal = v.toFixed(3)
    fedVal2 = v2.toFixed(3)
    fedVal3 = v3.toFixed(3)
    
  }
  textSize(20);
  text("feed in: " + fedVal, 10,30)
  text("feed in: " + fedVal2, 10,200)
  text("feed in: " + fedVal3, 10,320)
}