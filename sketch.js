var horse, horseAnimation, police1, police2, policeImage1, policeImage2
var money, moneyBag, moneyImg, moneyBagImg;
var invsGround
var bgImg;
var policeGroup, moneyBagGroup, moneyGroup;
var madKing, happyKing
var dungeon,field
var invsWall1, invsWall2;

var score;

var gameState


gameState = "PLAY";


function preload(){
  horseAnimation = loadAnimation("assets/horse1.png", "assets/horse2.png");
  policeImage1 = loadImage("assets/car1.png");
  madKing = loadImage('assets/madking.png');
  happyKing = loadImage('assets/happyking.png');

  moneyImg = loadImage("assets/moneydollars.png");
  moneyBagImg = loadImage ("assets/moneybag.png");
  bgImg = loadImage("assets/track.jpg");
  dungeon = loadImage("assets/dungeon.jpg");
  field = loadImage("assets/field.jpg");

}

function setup() {
  createCanvas(displayWidth, displayHeight);

  score = 0;

  bg = createSprite(width/2, height/100, 10, 900);
  bg.addImage(bgImg);
  bg.scale = 1.2
  bg.velocityY = 15;


  horse = createSprite(width/2,height-300,10,10);
  horse.addAnimation('running', horseAnimation);

  invsWall1 = createSprite(500,height/2,10,height);
  invsWall1.visible = false;

  invsWall2 = createSprite(1500,height/2,10,height);
  invsWall2.visible = false;


moneyGroup = new Group;
moneyBagGroup = new Group;
policeGroup = new Group;
  


}

function draw() {
background("white")

if (gameState === "PLAY"){

if(bg.y> 800){
  bg.y= height/100;
}

for(i = 0;i<moneyGroup.length; i++){
  if(horse.isTouching(moneyGroup[i])){
    moneyGroup[i].remove();
    score += 1;
  }
}

for(i = 0;i<moneyBagGroup.length; i++){
  if(horse.isTouching(moneyBagGroup[i])){
    moneyBagGroup[i].remove();
    score += 10;
  }
}

for(i = 0;i<policeGroup.length; i++){
  if(horse.isTouching(policeGroup[i])){
  gameState = "END"
  }
}

horse.collide(invsWall1);
horse.collide(invsWall2);




if (keyDown (RIGHT_ARROW)){
  horse.x += 15
}


if (keyDown (LEFT_ARROW)){
  horse.x += -15
}

if (score == 100){
  gameState = "WIN"
}


  spawnPolice();
  spawnMoney();
  spawnMoneyBags();
}   else if (gameState === "END"){

  horse.remove();
  background(dungeon);
  var madkingsprite = createSprite(500,500,10,10);
  madkingsprite.addImage(madKing);
  bg.remove();
  bg.velocityY = 0;
  fill("white");
  textSize(100);
  text("GO TO THE DUNGEON!!",900,500);

}  else if (gameState === "WIN"){
  horse.remove();
  background(field);
  var happykingsprite = createSprite (500,500,10,10)
  happykingsprite.addImage(happyKing);
  bg.remove();
  bg.velocityY = 0;
  fill("black");
  textSize(50);
  text("THANK YOU FOR SAVING THE KINGDOM!", 900, 500);
}  



  drawSprites();

  fill("black"); 
  textSize(22)
text ("MONEY:" + score,  600, 50);
}


  function spawnPolice(){
  if (frameCount % 100 == 0){

    police2 = createSprite(0,0,10,40);
  police2.addImage(policeImage1);
  police2.scale = 0.4;
police2.velocityY = 12;
policeGroup.add(police2);


police2.x = Math.round(random(600,1400));
policeGroup.add(police2);


  }

}



function spawnMoney(){
  if (frameCount % 10 == 0){
    money = createSprite (0,0, 10, 10);
    money.addImage(moneyImg);
    money.scale = 0.2;
    money.velocityY = 10;
    money.x = Math.round(random(600,1400))
    moneyGroup.add(money);


  }
}

function spawnMoneyBags(){
  if (frameCount % 200 == 0){
    moneyBag = createSprite (0, 0, 10, 10);
    moneyBag.addImage(moneyBagImg);
    moneyBag.scale = 0.2;
    moneyBag.velocityY = 7;
moneyBag.x = Math.round(random(600,1400));
moneyBagGroup.add(moneyBag);
  }
}