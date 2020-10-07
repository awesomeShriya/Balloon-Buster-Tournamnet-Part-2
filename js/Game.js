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
      bow1=createSprite(displayWidth-50,50);
      bow1.addImage(bowImg);
      bow1.scale=0.1;
      bow2=createSprite(displayWidth-50,200);
      bow2.addImage(bowImg);
      bow2.scale=0.1;
      bow3=createSprite(displayWidth-50,350);
      bow3.addImage(bowImg);
      bow3.scale=0.1;
      bow4=createSprite(displayWidth-50,500);
      bow4.addImage(bowImg);
      bow4.scale=0.1;
      bow5=createSprite(displayWidth-50,650);
      bow5.addImage(bowImg);
      bow5.scale=0.1;
      bows=[bow1,bow2,bow3,bow4,bow5];
     // cars = [car1, car2, car3, car4];
    }
  
    play(){
      form.hide();
  
      Player.getPlayerInfo();
      //player.getCarsAtEnd();
      
      if(allPlayers !== undefined){
        //var display_position = 100;
        background("brown");
        image(backgroundImg,0,0,displayWidth,displayHeight);
        
        //index of the array
        var index = 0;
  
        //x and y position of the cars
        var x = 250;
        var y;
  
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;
  
          //position the cars a little away from each other in x direction
          x = x + 250;
          //use data form the database to display the cars in y direction
          //y = displayHeight - allPlayers[plr].distance;
         // cars[index-1].x = x;
         // cars[index-1].y = y;
  
          if (index === player.index){
            stroke(10);
            fill("red");
            ellipse(x,y,60,60);
            bows[index - 1].shapeColor = "red";
            camera.position.x = displayWidth/2;
            camera.position.y = bows[index-1].y
          }
         
          //textSize(15);
          //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        }
  
      }
  
      if(keyIsDown(UP_ARROW) && player.index !== null){
        player.distance -=10
        player.update();
      }
      if(keyIsDown(DOWN_ARROW) && player.index !== null){
        player.distance +=10
        player.update();
      }
      if(frameCount%20===0){
        balloons=createSprite(0,random(100,1000),10,10);
        balloons.velocityX=5;
        balloons.scale=0.1
        var rand=Math.round(random(1,7));
        switch(rand){
          case 1:balloons.addImage(balloon1Img);
          break;
          case 2:balloons.addImage(balloon2Img);
          break;
          case 3:balloons.addImage(balloon3Img);
          break;
          case 4:balloons.addImage(balloon4Img);
          break;
          case 5:balloons.addImage(balloon5Img);
          break;
          case 6:balloons.addImage(balloon6Img);
          break;
          case 7:balloons.addImage(balloon7Img);
          break;
        }
        balloonGroup.add(balloons);
      }
  
      if(player.distance>5200){
        gameState=2;
        player.rank+=1
        Player.updateCarsAtEnd(player.rank)
      }
  
      drawSprites();
    }
    end(){
      console.log("gameEnded");
      console.log(player.rank)
    }
  }
  