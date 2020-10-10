var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkeyImage;
var ground;
var banana ,bananaImage;
var rock, rockImage;
var bananaGroup, obstacleGroup;
var survivalTime;
var bananas;
var invisibleGround;
var stop, stopImage;


function preload(){
  
  
  monkeyImage =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  rockImage = loadImage("obstacle.png");
  stopImage = loadImage("sprite_1.png");
 
}



function setup()
{
  ground = createSprite(300,470,900,20);
  ground.shapeColour = "orange";
  ground.velocityX = -6;
  
  invisibleGround = createSprite(300,473,900,20);
  invisibleGround.shapeColour = "Brown";
  
  
  monkey = createSprite(100,400,20,20);
  monkey.addAnimation("monkey",monkeyImage);
  monkey.scale =0.3;
  
  survivalTime = 0;
  
  
  bananaGroup = new Group();
  obstaclesGroup = new Group();
  
}


function draw() 
{
  createCanvas(600,490);
  background("cyan");
  
  
  monkey.setCollider("rectangle",10,20,300,500);
  monkey.debug = true;
  
  
  
  if(gameState === PLAY)
  {
    survivalTime = survivalTime + Math.round(frameCount%30 === 0);
  if(keyDown("space") && monkey.y>340)  
  {
    monkey.velocityY = -12;
  }  
  
  monkey.velocityY = monkey.velocityY+0.5
    
  if(bananaGroup.isTouching(monkey))   
  {
    bananaGroup.destroyEach();
    bananas = bananas+1;
  }   
    
  ground.x = ground.width/2
  monkey.collide(invisibleGround);
    
  food();
  obstacles();  

  }
  
  if(obstaclesGroup.isTouching(monkey))
  {
    gameState = END;
    monkey.addImage("monkey",stopImage);
  }
  
  if(gameState === END)
  {
    monkey.velocityY = 0;
    ground.velocityX = 0;
    textSize(30);
    fill("pink");
    text("GAME OVER",235,120);
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }
  
  obstaclesGroup.depth = ground.depth;
  obstaclesGroup.depth = obstacles.depth+1;
  
  
  drawSprites();
  textSize(25);
  fill("green");
  stroke("green");
  text("SURVIVALTIME : "+survivalTime,225,40);
   
}

  function food()
{
  if(frameCount%110 === 0)
  {
    banana = createSprite(600,200,20,20);
    banana.velocityX = -(5+survivalTime/5);
    banana.addImage("banana",bananaImage);
    banana.scale = 0.15;
    banana.lifetime = 115;
    bananaGroup.add(banana);
  }  
}
  
  function obstacles()
{
  if(frameCount%110 === 0)
  {
    rock = createSprite(600,425,20,20);
    rock.velocityX = -(5+survivalTime/5);
    rock.addImage("rock",rockImage)
    rock.scale = 0.2;
    rock.lifetime = 115;
    obstaclesGroup.add(rock);
  }
}
