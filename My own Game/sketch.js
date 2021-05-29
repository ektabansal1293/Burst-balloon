var database 

var blueBalloon,lightBlueBalloon,greenBalloon,blackBalloon,balloon,balloonGroup 

var arrLeftImg,arrRightImg,arrowGroup,arrow

var bkgStart, bkgMiddle

var bowLeftImg,bowRightImg

var bow1,bow2,bows

var  gameState = 0;
var  playerCount = 0;

var game , player , form;

var allPlayers ;

var arrLeave,congrats,blop

function preload(){
  blueBalloon=loadImage("images/BlueBalloon.png");
  blackBalloon=loadImage("images/BlackBalloon.png")
  lightBlueBalloon=loadImage("images/LightBlueBalloon.png")
  greenBalloon=loadImage("images/GreenBalloon.png")
  arrLeftImg=loadImage("images/ArrowLeft.png")
  arrRightImg=loadImage("images/ArrowRight.png")
  bkgMiddle=loadImage("images/BkgMiddleImage.jpg")
  bkgStart=loadImage("images/BkgStartImage.jpg")
  bowLeftImg=loadImage("images/BowLeft.png")
  bowRightImg=loadImage("images/BowRight.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  database= firebase.database();

  arrLeave = loadSound("Sounds/Swoosh.mp3")
  congrats = loadSound("Sounds/Congrats.wav")
  blop = loadSound("Sounds/Blop.mp3")

  game = new Game();
  game.getState()
  //console.log(gameState)
  game.start()  
}

function draw() {
  background(bkgStart);  
  console.log(gameState);

  if (playerCount===2){
    console.log("Making node gameState=1")
    game.writeState(1);
    playerCount=0;
  }

  if (gameState===1){
    clear()
    game.play();
  }

  if(gameState === 2 ){
    console.log("Going to function end")
    game.end();
  }
  
  
  
}