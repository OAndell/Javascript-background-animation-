var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;
var particles = [];

function setup() {
  	var canvas = createCanvas(canvasWidth,canvasHeight);
	canvas.position(0,0);
	canvas.style('z-index', '-1');
  	stroke(255);
	strokeWeight(2);
  	noStroke();
  	for(var i = 0; i < 250; i++){
  		particles.push(new Particle(random(width),random(height-10)));
  	}
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	particles = [];
	for(var i = 0; i < 250; i++){
  		particles.push(new Particle(random(width),random(height-10)));
  	}
}

function draw() {
	
	//background(234,255,255);
	background(255);
	for(var i = 0; i < particles.length; i++){
		particles[i].update();
	}
	fill(0)
	
}

function Particle(x,y){
	this.x = x;
	this.y = y;
	this.r = random(3,10);
	//this.red = random(255);
	//this.green = random(255);
	//this.blue = random(255);
	if(random(2)>1){
		this.red = 0;
		this.green = random(0,100);
		this.blue = 255;
	}
	else{
		this.red = 255;
		this.green = random(0, 150);
		this.blue = 0;
	}
	
	this.friction = 0.95;
	this.speedX = 0;
	this.speedY = 0;
	
	this.update = function(){
		fill(this.red, this.green, this.blue, 40)
		ellipse(this.x,this.y, this.r,this.r);
		this.x += this.speedX;
		this.y += this.speedY;
		this.speedX *=this.friction;
		this.speedY *=this.friction;
		this.idle();
		this.handleMouse();
		
	};
	
	this.idle = function(){
		if(random(1000) < 2){
			this.speedX = random(-0.5,0.5);
			this.speedY = random(-0.5,0.5);
		}
	};
	
	this.handleMouse = function(){
			if(dist(mouseX, mouseY, this.x, this.y) < 50){
				this.speedX = random(-1,1);
				this.speedY = random(-1,1);
				this.connect();
			}
	};
	
	this.connect = function(){
		var neighboors = this.getNeighboor(150);
		for(var i = 0; i < neighboors.length; i++){
				part = neighboors[i];
				endX = part.getX();	
				endY = part.getY();
				stroke(this.red, this.green,this.blue);
				line(this.x, this.y, endX, endY);
				noStroke();
		}
	};
	
	this.getX = function(){
		return this.x;
	};
	
	this.getY = function(){
		return this.y;
	};
	
	this.getNeighboor = function(maxDist){
		var neighboors = []
		for(var i = 0; i < particles.length; i++){
			if(dist(this.x, this.y, particles[i].getX() ,particles[i].getY()) < maxDist){
				neighboors.push(particles[i])
			}
		}
		return neighboors;
	};
}
