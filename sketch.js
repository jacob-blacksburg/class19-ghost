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
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(200,300);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.4
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  spookySound.loop();
}

function draw() {
  background(0);
  if(gameState === "play"){
  //ghost.debug = true

  if(keyDown("Left_Arrow")){
    ghost.x -= 3
  }
  if(keyDown("Right_Arrow")){
    ghost.x += 3
  }
  if(keyDown("Space")){
    ghost.velocityY = -10;
  }
  ghost.velocityY = ghost.velocityY+0.6
  if(tower.y > 400){
      tower.y = 300
    }
  spawnDoor();
  if(ghost.isTouching(climbersGroup)){
    ghost.velocityY = 0
  }
  if(ghost.y>550||ghost.isTouching(invisibleBlockGroup)){
    gameState = "end"
  }
  drawSprites();
  }
  else if(gameState === "end"){
    fill("red");
    textSize(30);
    text("Game Over",230,250);
  }
}
function spawnDoor(){
if(frameCount%240 ===0) {
  door = createSprite(200,-50);
  climber = createSprite(200,10);
  invisibleBlock = createSprite(200,15);
  invisibleBlock.width = climber.width
  invisibleBlock.height = 2
  //invisibleBlock.visible = false
  invisibleBlock.debug = true
  door.x = Math.round(random(120,400));
  climber.x = door.x;
  invisibleBlock.x = door.x;
  door.addImage("door",doorImg);
  climber.addImage("climb",climberImg);
  door.velocityY = 1
  climber.velocityY = 1
  invisibleBlock.velocityY = 1
  door.lifetime = 600
  climber.lifetime = 600
  invisibleBlock.lifetime = 600
  door.depth = ghost.depth
  ghost.depth += 1
  doorsGroup.add(door);
  climbersGroup.add(climber);
  invisibleBlockGroup.add(invisibleBlock);
}
}