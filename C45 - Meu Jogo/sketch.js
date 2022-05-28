var gun, gunnerImg, gunnerImg2, bala, balaImg, balaGroup, fundo;
var alvo, inocente, alvoImg, obstaclesGroup;
var passaro, passaroIMg, passarosGroup;
var buttonPlay, buttonPlayImg;
var score = 10;
var atirou = false;
var frame = 0;
var gameState = 0;


function preload(){
    fundo = loadImage("assets/deserto.jpg");
    gunnerImg = loadImage("assets/shooter_2.png");
    gunnerImg2 = loadImage("assets/shooter_3.png");
    alvoImg = loadImage("assets/Alvo.png");
    balaImg = loadImage("assets/bala.PNG");
    passaroImg = loadImage("assets/passaro.png");
    buttonPlayImg = loadImage("assets/play.png");
}



function setup() {
  createCanvas(windowWidth, windowHeight);

    gun = createSprite(70, height/2);
    gun.addImage("normal", gunnerImg);
    gun.addImage("atirando", gunnerImg2);
    gun.scale = 0.5;

    obstaclesGroup = new Group();
    balaGroup = new Group();
    passarosGroup = new Group();

    buttonPlay = createSprite(width/2 - 50, height/2);
    buttonPlay.addImage(buttonPlayImg);
    buttonPlay.scale = 0.5;

}



function draw(){
    image(fundo, 0, 0, width, height);

    if(gameState == 0){
        gun.visible = false;
        buttonPlay.visible = true;
        if(mousePressedOver(buttonPlay)){
            gameState = 1;
            buttonPlay.visible = false;
        }
    }


    if(gameState == 1){
        textSize(40);
        fill("black");
        text("Score: "+ score, 50, 50);


        

        gun.visible = true;
        gun.y = World.mouseY;
        if(gun.y <= 200){
            gun.y = 200;
        }

        if(keyWentDown("SPACE") && !atirou){
            bala = createSprite(gun.x, gun.y - 39,10,5);
            bala.addImage(balaImg);
            bala.scale = 0.015;
            bala.velocityX = 15;
            balaGroup.add(bala); 
            atirou = true;
            frame = frameCount;
            frame = frame + 50;
            gun.changeImage("atirando");
        }

        else if(keyWentUp("SPACE")){
            gun.changeImage("normal");
        }

        if(frame === frameCount){
            atirou = false;
        }

        if(obstaclesGroup.isTouching(balaGroup)){
            for(var i = 0; i < obstaclesGroup.length; i++){
                for(var j = 0; j < balaGroup.length; j++){
                    if(obstaclesGroup[i].collide(balaGroup[j])){
                        obstaclesGroup[i].destroy();
                        balaGroup[j].destroy();
                        score = score + 5;
                    }
                }
            }

        }

        if(passarosGroup.isTouching(balaGroup)){
            for(var i = 0; i < passarosGroup.length; i++){
                for(var j = 0; j < balaGroup.length; j++){
                    if(passarosGroup[i].collide(balaGroup[j])){
                        passarosGroup[i].destroy();
                        balaGroup[j].destroy();
                        score = score - 10
                    }
                }
            }
        }
        if(score == 300){
            gameState = 2;
        }


        spawnBirds();
        spawnAlvos();
    }
    else{

    }
    if(gameState == 2){

    }



    drawSprites();
}

function spawnAlvos(){
    if(frameCount%Math.round(random(60,120)) === 0){
        alvo = createSprite( width, random(150, height),60,100);
        alvo.addImage(alvoImg);
        alvo.scale = 0.07;
        alvo.velocityX = -3; 
        obstaclesGroup.add(alvo);
    }
}
function spawnBirds(){
    if(frameCount%Math.round(random(200,320)) === 0){
        passaro = createSprite( width, random(150, height),60,100);
        passaro.addImage(passaroImg);
        passaro.scale = 0.15;
        passaro.velocityX = -6; 
        passarosGroup.add(passaro);
    }
}













