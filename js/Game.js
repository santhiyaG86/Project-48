class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    pac1 = createSprite(100,200);
    pac1.addImage("pacman1",pac1_img);
    pac1.scale = 0.06;

    pac2 = createSprite(300,200);
    pac2.addImage("pacman2",pac1_img);
    pac2.scale = 0.06;
    
    pacs = [pac1, pac2];

  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
   
    
    if(allPlayers !== undefined){
      background(Background);
     
      var index = 0;

     
      var y = 175 ;
      var x = 175;

      for(var plr in allPlayers){
        
        index = index + 1 ;

        
        y = y + 200;
        x = x + 200;
        
        x = displayHeight - allPlayers[plr].distance;
        y = displayHeight - allPlayers[plr].Ydistance;

        pacs[index-1].x = x;
        pacs[index-1].y = y;
       

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          pacs[index - 1].shapeColor = "red";
        }

        if(index === player.index){
          fill("white");
          textSize(25);
          text(allPlayers[plr].name, x-35, y+55);
      }
       
      }
    }
      
      fill("white");
      textSize(20);
      stroke("yellow");
      text("SCORE: " + score, 650,50);

      fill("white");
      textSize(20);
      stroke("cyan");
      text("TARGET: " + target, 500,50);

      fill("white");
      textSize(20);
      stroke("lime");
      text("LIVES: " + lives, 350,50);

      if(frameCount % ghostFrameDivisor === 0){
        ghost = createSprite(displayWidth-50,200,20,20);
        ghost.scale = 0.3;
        
        ghost.y = Math.round(random(100,600));
        
        ghost.velocityX = -4
        ghost.lifetime = 400;

        var rand = Math.round(random(1,2));
        switch(rand) {
          case 1: ghost.addImage(ghostImg1);
              break;
          case 2: ghost.addImage(ghostImg2);
              break;
          default: break;
    }


        ghostGroup.add(ghost);
      }

      if(frameCount % 1000 === 0){
        powerup = createSprite(displayWidth-50,200,20,20);
        powerup.addImage("power", powerupImg);
        powerup.scale = 0.1;
        
        powerup.y = Math.round(random(100,600));
        
        powerup.velocityX = -4
        powerup.lifetime = 400;

        powerGroup.add(powerup);
      }

      if(frameCount % 50 === 0){
        fireball3 = createSprite(displayWidth-50,50,20,20);
        fireball3.addImage("fire", fireImg2);
        
        fireball3.scale = 0.4;
        fireball3.velocityX = -5;
    
        fireball3.y = Math.round(random(100,600));


        fireball3.lifetime = 1000;
        fireGroup2.add(fireball3);
        
      }


      if(keyWentDown("Space") && player.index !== null){
        fireball1 = createSprite(200,200,10,10);
        fireball1.addImage("fire", fireImg1);
    
        fireball1.scale = 0.3;
        fireball1.velocityX = 5;
    
        fireball1.lifetime = 300;
        fireball1.y = pac1.y;
        fireball1.x = pac1.x;
        
        fireGroup.add(fireball1);
      }
  
      if(keyWentDown("Space") && player.index !== null){
        fireball2 = createSprite(200,200,10,10);
        fireball2.addImage("fire", fireImg1);
    
        fireball2.scale = 0.3;
        fireball2.velocityX = 5;
  
        fireball2.lifetime = 500;
        fireball2.y = pac2.y;
        fireball2.x = pac2.x;

        fireGroup.add(fireball2);

        shootSound.play();
      }


      if(ghostGroup.isTouching(pacs)){
        ghostGroup.destroyEach();
        explosionSound.play();

        lives = lives-1;
      }

     // score3 = score1 + score2;

      if(ghostGroup.isTouching(fireGroup)){
        ghostGroup.get(0).destroy();
        fireGroup.get(0).destroy();

       // score1 = score1 + 1;
        //score2 = score2 + 1;
        score = score+1;
        player.updateScore();
      }

      if(fireGroup.isTouching(fireGroup2)){
        fireGroup.get(0).destroy();
        fireGroup2.get(0).destroy();
      }

      if(fireGroup2.isTouching(pacs)){
       // score1 = score1 - 1;
        //score2 = score2 - 1;
        score = score-1
        fireGroup2.get(0).destroy();
        explosionSound.play();

        player.updateScore();
      }

      if(powerGroup.isTouching(pacs)){
        lives = lives+1;
        powerGroup.get(0).destroy();

        coinSound.play();
      }

      if(keyIsDown(LEFT_ARROW) && player.index !== null){
        player.distance +=6
        player.update();
      }
      
      if(keyIsDown(RIGHT_ARROW) && player.index !== null){
        player.distance -=6
        player.update();
      }

      if(keyIsDown(UP_ARROW) && player.index !== null){
        player.Ydistance +=6
        player.update();
      }
      if(keyIsDown(DOWN_ARROW) && player.index !== null){
        player.Ydistance -=6
        player.update();
      }

      /*if(pac1.x > 800 || (pac1.x < 10 || (pac1.y > 700 ||(pac1.y < 10)))){
        pac1.distance = 500;
        pac1.Ydistance = 500;

        pac1.console.log(x);

        player.update();
      }

      if(pac2.x > 800 || (pac2.x < 10 || (pac2.y > 700 ||(pac2.y < 10)))){
        pac2.distance = 500;
        pac2.Ydistance = 500;

        player.update();
      }*/


      if(score === target){
        target = target+10;

        ghostFrameDivisor = +40;

        coinSound.play();
      }

      if(lives === 0){
        lostSound.play();

        gameState = 2;

        background("red");
        ghostGroup.destroyEach();
        fireGroup.destroyEach();
        fireGroup2.destroyEach();

        fill("white");
        stroke("orange");
        text("Aww u lost!! Press restart and reload to play again" ,450,300);

      }
  
    drawSprites();

  }
}