var PLAY = 1;
var END = 0;
var gameState = PLAY;

var car,car2,carImg,ca2Img;
var track,trackImg;
var car2Group;
var carCollided;

function preload(){
  
	carImg = loadImage("newcar.png");
	trackImg = loadImage("track.png");
  carCollided = loadImage("crash.jpg");
  car21Img = loadImage("car2 1.jpg");
  car22Img = loadImage("car2 2.png");
  car23Img = loadImage("car2 3.png");
}



function setup() {
  createCanvas(1200,600);
  
  car = createSprite(50,160,20,50);
  car.addImage("newcar.png",carImg);
  car.scale = 0.1;
  
  track = createSprite(300,100,10000,400);
  track.addImage("track.png",trackImg);
  
  score = 0;
  
  car2Group = createGroup();
  
}


function draw() {
  
  text("score: " + score,500,50);
  
  if(gameState === PLAY){

    camera.position.y = car.y;

    if(keyDown("UP_ARROW")){
      car.y = car.y-5;
  }
  
  if(keyDown("DOWN_ARROW")){
    car.y = car.y+5;
}
    
    if(keyDown("RIGHT_ARROW")){
      car.x = car.x+5;
	}
	
	if(keyDown("LEFT_ARROW")){
		car.x = car.x-5;
	}

    spawnCar2();
    
    if(car2Group.isTouching(car)){
	  car.addImage("crash.jpg",carCollided);
	  car.scale = 0.1;
      gameState = END;   
    }
    
  } 
  else if(gameState === END){
      
    car2.y =0;
    car.y = 0;
    
    car2Group.setLifetimeEach(-1);

    car2Group.setVelocityXEach(0);
  
  }

  
  drawSprites();
  
}


function spawnCar2() {
  if(frameCount % 60 === 0) {
    var car2 = createSprite(600,120,40,10);
    car2.y = Math.round(random(80,120));
    car2.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: car2.addImage(car21Img);
              break;
      case 2: car2.addImage(car22Img);
              break;
      case 3: car2.addImage(car23Img);
      default: break;
    }
    
        
    car2.scale = 0.1;
    car2.lifetime = 1000;
    
    track.depth = car2.depth;
    car2.depth = car2.depth + 1;

    track.depth = car.depth;
    car.depth = car2.depth + 1;

    car2Group.add(car2);
  }
}

