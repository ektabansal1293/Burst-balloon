class Game {
    constructor(){
        
    }

    getState(){
         var gameStateRef = database.ref('gameState')
         gameStateRef.on("value",function(data){
             gameState = data.val();
         })
    }

    writeState(state){
        database.ref('/').update({
            gameState: state
        })
    }

   


    start(){
        player = new Player();
        player.getCount()
        form = new Form();
       form.display();

       balloonGroup = new Group();
       arrowGroup = new Group()
       
       bow1=createSprite(15,height/2 , 10,100);
       bow1.addImage('bow1', bowLeftImg)
       bow1.scale = 0.8
       bow2=createSprite(width-30,height/2 , 10 , 100);
       bow2.addImage('bow2', bowRightImg)
       bow2.scale = 0.8
        bows=[bow1,bow2];

    


    }

    play(){
        form.hide();
        Player.getPlayerInfo()
        imageMode(CENTER)
        image(bkgMiddle,width/2, height/2, width, height )


        if(allPlayers!= undefined){
            var index = 0 ;
            for(var plr in allPlayers){       
                index = index+1       
                bows[index-1].y = height/2+allPlayers[plr].distance;
                
                stroke("yellow")
                strokeWeight(4)
                fill("blue")
                textFont("Algerian")
                textSize(50)
                text("Player1 :" + allPlayers.player1.score,width/2-200,100);
                text("Player2 :" + allPlayers.player2.score,width/2-200,150);
                
                /*if (allPlayers.player1.score === 10 || allPlayers.player2.score === 10) {
                  gameState = 2
                  this.writeState(2)
                }*/
            }
            
        }



        
        if(keyDown(UP_ARROW)  &&  player.index!=null){
            player.distance -=10
            player.update();

        }

        if(keyDown(DOWN_ARROW)  &&  player.index!=null){
            player.distance +=10
            player.update();

        }


        if(keyWentDown("space")){
            arrow = createSprite(45,65,60,10);
            arrow.scale = 0.1
            arrow.x = bows[player.index-1].x
            arrow.y = bows[player.index-1].y
            arrLeave.play();
            if(player.index===1){
                arrow.velocityX = 8
                arrow.addImage('arrowright', arrRightImg)
            }
            if(player.index===2){
                arrow.velocityX = -8
                arrow.addImage('arrowleft', arrLeftImg)
            }
            arrow.lifetime = width/8;
            arrowGroup.add(arrow);
        }

        this.spawnBalloon();
        this.burstBallooon();

        if (player.score === 5 ) {
            gameState = 2;
            this.writeState(2);
            player.rank+=1
            Player.updateHighestRank(player.rank)
        }
                     
        drawSprites();
    }

    end(){
        console.log("Iam in function end");
        var message = createElement('h2')
         message.position(displayWidth/2-100, displayHeight/2)
       if (player.rank === 1) {
           message.html("You win" + player.name)
           //congrats.play();
       } else {
           message.html("You lose" + player.name)
       }
    }



    spawnBalloon(){
        if(World.frameCount % 40 === 0){
            balloon = createSprite(random(50,width-50), 0);
            balloon.scale = 0.1;
            balloon.velocityY = 6;
            balloon.lifetime = height/6;
            balloonGroup.add(balloon);
            var selectBalloon = Math.round(random(1,4));
            switch(selectBalloon){
                case 1 : balloon.addImage( 'black', blackBalloon)
                break;
                case 2 : balloon.addImage( 'blue', blueBalloon)
                break;
                case 3 : balloon.addImage( 'green', greenBalloon)
                break;
                case 4 : balloon.addImage( 'lightBlue', lightBlueBalloon)
                break;
            }  
        }       
    }

    burstBallooon(){
        for (var i = 0; i<arrowGroup.length;i++ ) {
            for (var j = 0; j<balloonGroup.length; j++) {
                if( balloonGroup.get(j).isTouching(arrowGroup.get(i))){
                    arrowGroup.get(i).destroy();
                    balloonGroup.get(j).destroy();
                    player.score = player.score+1;
                    blop.play();
                    player.update()
                }
                
            }
        }
    
    }
}