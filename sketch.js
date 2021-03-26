var ghost, pac1_img ,pac1, pac2, Background, track, fireball1, fireball2, fireball3

var database, player, playerCount, allPlayers, game, form, distance

//var playerScore = score3 

var gameState = 0
var PLAY = 1
var END = 2

var pacs

var ghostImg1,ghostImg2, fireImg1, fireImg2, powerup, powerupImg

var score = 0;
//var score2 = 0;
//var score3 = score1 + score2;

var target = 10;
var lives = 3;

var ghostFrameDivisor = 50;

var explosionSound, shootSound, lostSound, coinSound

function preload(){
    pac1_img = loadImage("images/PacMan.png");
    
    Background = loadImage("images/Background.jpg");

    ghostImg1 = loadImage("images/Ghost1.png");
    ghostImg2 = loadImage("images/Ghost2.png");

    fireImg1 = loadImage("images/fireball1.png");
    fireImg2 = loadImage("images/fireball2.png");
    
    powerupImg = loadImage("images/PowerUp.png");

    explosionSound = loadSound("sound/explosion.wav");
    shootSound = loadSound("sound/shoot.wav");
    coinSound = loadSound("sound/coin.wav");
    lostSound = loadSound("sound/lost.wav");
}

function setup(){
    var canvas = createCanvas(displayWidth, displayHeight);

    ghostGroup = createGroup();

    fireGroup = createGroup();
    fireGroup2 = createGroup();
    fireGroup3 = createGroup();

    powerGroup = createGroup();

    database = firebase.database();

    game = new Game();
    game.getState();
    game.start();
}

function draw(){
    background("pink");

    if(playerCount === 2){
        game.update(1);
      }
      if(gameState === 1){
        clear();
        game.play();
    }

      if(gameState === 2){
        game.end();
      }
      
      
    drawSprites();

}

