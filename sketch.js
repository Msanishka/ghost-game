var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  gameOverImage = loadImage ("gameOver.png") ;
  restartImg = loadImage ("restart.png") ;
}

function setup(){
  createCanvas(windowWidth,windowHeight);
 
  tower = createSprite(600,600);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1; 

  spookySound.loop();

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);

  gameOver = createSprite (width/2,height/3 + 50) ;
  gameOver.addImage (gameOverImage) ;
  gameOver.scale = 0.9 ;
  
  restart = createSprite (width/2,height/2) ;
  restart.addImage (restartImg) ;
  restart.scale = 0.9 ;
  
  invisibleground = createSprite(width/2,height-10,width,10) ;
  invisibleground.visible = true ;

}

function draw(){
  background(0);
  if (gameState === "play") {
    gameOver.visible = false ;
    restart.visible = false ;
    ghost.x=World.mouseX;
   
    if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors();

    
    //climbersGroup.collide(ghost);
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end"
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //add each door to the group
    doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}
function reset () {
  
  gameState = PLAY ;

  gameOver.visible = false ;
  restart.visible = false ;

  doorsGroup.destroyEach () ;
  climberGroup.destroyEach () ;
  invisibleBlockGroup.destroyEach () ;
  
}

