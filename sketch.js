var superMan;
var Boost;
var Ground;
var gameState = 'play';
var score = 0;
var boostGroup;
var Enemy;
var enemyGroup;
var Restart;
var gameOver;
var supermanImg,boostImg, backgroundImg;

function preload () {
	supermanImg=loadImage("Images/superman.png");
	boostImg=loadImage("Boost.jpg");
	backgroundImg=loadImage("Images/bg1.png");
}

function setup () {
	createCanvas(1000,500);
	Ground = createSprite(500,450,2000,10);
	Ground.velocityX = -4;
	
	superMan = createSprite(130,380);
	superMan.addImage(supermanImg);
    superMan.scale=0.1
	
	boostGroup = new Group ();
	enemyGroup = new Group ();
	
	Restart = createSprite(450,250,20,20);
	Restart.shapeColor = 'Blue';
	gameOver = createSprite(400,200,40,40);
	gameOver.shapeColor = 'Green';
}

function draw () {
	background("yellow");

	if (gameState === 'play'){
		Restart.visible = false;
		gameOver.visible = false;
	if (Ground.x<0) {
		Ground.x = 700;
	}

	if (keyDown('UP_ARROW')){
		superMan.y = superMan.y-10;
	}
	if (keyDown('DOWN_ARROW')){
		superMan.y = superMan.y+5;
	}
	if (keyDown('RIGHT_ARROW')) {
		superMan.x = superMan.x+5;
	}
	if (keyDown('LEFT_ARROW')){
		superMan.x = superMan.x-10;
	}

	spawnBoost();
	spawnEnemies();
	

	if (boostGroup.isTouching(superMan)){
		boostGroup.destroyEach();
	}
	if (enemyGroup.isTouching(superMan)){
		gameState = 'end';
		
	}
}
else if (gameState === 'end'){
	gameOver.visible = true;
	Restart.visible = true;
	Ground.velocityX = 0;
	boostGroup.setVelocityXEach(0);
	boostGroup.setLifetimeEach(-1);
	superMan.destroy();
	enemyGroup.destroyEach();
}
	
	drawSprites();
}

function spawnBoost(){
	if (frameCount%200 === 0){
		Boost = createSprite(1000,20,20,20);
		Boost.y = Math.round(random(125,375));
		//Boost.addImage(boostImg);

		Boost.velocityX = -4;
	//	Boost.depth = superMan.depth;
	//	superMan.depth = superMan.depth+1;
		Boost.lifetime = 250;
		boostGroup.add(Boost);
	}
}

function spawnEnemies (){
	if(frameCount%150 === 0){
		Enemy = createSprite(1000,20,20,20);
		Enemy.y = Math.round(random(100,400));
		Enemy.shapeColor = 'Red';
		Enemy.velocityX = -5;
		Enemy.lifetime = 200;
		enemyGroup.add(Enemy);
	}
}
