var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud;
var cloudImage;
var obstacle1;
var obstacle2;
var obstacle3;
var obstacle4;
var obstacle5;
var obstacle6;
var score;
var PLAY=-1;
var END=0;
var gameState = PLAY;
var cloudsGroup;
var obstacleGroup;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png")
  obstacle1 =loadImage("obstacle1.png");
  obstacle2 =loadImage("obstacle2.png");
  obstacle3 =loadImage("obstacle3.png");
  obstacle4 =loadImage("obstacle4.png");
  obstacle5 =loadImage("obstacle5.png");
  obstacle6 =loadImage("obstacle6.png");
}


function setup() {
  createCanvas(600, 200);
  
  //crear sprite de trex
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  
  //agregar escala y posición al Trex
  trex.scale = 0.5;
  trex.x = 50
  
  //crear sprite de suelo
  ground = createSprite(200,180,400,20);
  ground.addImage("ground", groundImage);
  ground.velocityX=-4;
 invisibleGround = createSprite (200,190,400,10)
invisibleGround.visible = false;
obstacleGroup= createGroup();
cloudsGroup = createGroup();
score=0
}

function draw() { 
  //establecer color de fondo 
  background(180); 
  //c15 
  text("Puntuacion: "+ score, 500,50); 
  if (gameState === PLAY){ 
    ground.velocityX = -4; 
    score= score + Math.round(frameCount/60); 
    //reiniciando el suelo 
    if (ground.x < 0){ ground.x = ground.width/2; 
  } 
  //hacer que el Trex salte al presionar la barra espaciadora 
  if(keyDown("space")&& trex.y >= 100) { trex.velocityY = -10; 
  } 
  trex.velocityY = trex.velocityY + 0.8; 
  spawnClouds(); 
  spawnObstacles(); 
  //cambio de estado 
  if( obstaclesGroup.isTouching(trex)){ gameState = END;
   } } 
   else if (gameState === END){ ground.velocityX = 0; 
    obstaclesGroup.setVelocityXEach(0); 
    cloudsGroup.setVelocityXEach(0); } 
    //evitar que el trex caiga 
    trex.collide(invisibleGround); 
    // llamando la funcion de crear nubes 
    spawnClouds(); 
    spawnObstacles(); 
    drawSprites();
   }


function spawnObstacles(){ 
  // frameCount 
  if ( frameCount % 60 ===0){ 
    // create sprite 
    obstacle = createSprite(600,165,10,40); 
    //velocidad -6 
    obstacle.velocityX=-6; 
    // generar obstaculos al azar 
    var rand = Math.round(random(1,6)); 
    switch(rand){ 
      case 1: obstacle.addImage(obstacle1); 
      break; 
      case 2: obstacle.addImage(obstacle2); 
      break; 
      case 3: obstacle.addImage(obstacle3); 
      break; 
      case 4: obstacle.addImage(obstacle4); 
      break; 
      case 5: obstacle.addImage(obstacle5); 
      break; 
      case 6: obstacle.addImage(obstacle6);
       break; 
       default: break; } 
       obstacle.scale= 0.5;
        obstacle.lifetime= 300; 
      obstacleGroup.add(obstacle); 
      } 
      }


function spawnClouds(){
if (frameCount %60===0){
cloud = createSprite(600,100,40,10)
cloud.addImage(cloudImage);
cloud.y = Math.round(random(10,60))
cloud.scale = 0.4;
cloud.velocityX = -3
cloud.lifetime = 200;
cloud.depth = trex.depth;

}
}