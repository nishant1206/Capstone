var player, player_img;
var backface, backface_img;
var edge;
var ob, ob_img, ob_inverted, ob_inverted_img;
var Dora_Cake, Dora_Cake_img, DoraCake_group;

var game_state = "play";

var points = 0;

localStorage["HighScore"] = 0;

function preload() {
    player_img = loadImage("doraemon.png");
    backface_img = loadImage("backface.jpg");
    ob_img = loadImage("gian.png");
    ob_inverted_img = loadImage("suneo.png");
    Dora_Cake_img = loadImage("DoraCake.gif");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    //background
    backface = createSprite(windowWidth / 2, windowHeight / 2);
    backface.addImage(backface_img);
    backface.scale = 1;
    backface.velocityX = -2;

    //player
    player = createSprite(windowWidth / 10, windowHeight / 2);
    player.addImage(player_img);
    player.scale = 0.5;
    // player.debug = true;
    player.setCollider("rectangle", 0, 0, 300, 350);

    //creating Edges
    edge = createEdgeSprites();

    //Creating Obsticles Groups
    ob = new Group();
    ob_inverted = new Group();
    DoraCake_group = new Group();
}

function draw() {

    if (game_state == "play") {
        if (keyDown("space")) {
            player.velocityY = -4;
        }
        player.velocityY = player.velocityY + 0.2;

        if (keyDown("right")) {
            player.x = player.x + 10;
        }

        if (keyDown("left")) {
            player.x = player.x - 10;
        }

        if (player.isTouching(edge[0]) || player.isTouching(edge[1]) || player.isTouching(edge[2]) || player.isTouching(edge[3]) || player.isTouching(ob) || player.isTouching(ob_inverted)) {
            game_state = "over";
        }

        if (backface.x <= windowWidth / 4) {
            backface.x = windowWidth / 2;
        }

        if (frameCount % 2 == 0) {
            localStorage["HighScore"]++;
        }
    }

    obsticles();
    obsticles_2();
    doracake();

    if (DoraCake_group.isTouching(player)) {
        points++;
        DoraCake_group.destroyEach();
    }

    drawSprites();

    fill(rgb(255, 255, 255));
    textSize(40);
    text("Points : " + points, windowWidth / 4.5, 40)
    text("Score : " + localStorage["HighScore"], windowWidth / 1.5, 40);

    if (game_state == "over") {
        backface.velocityX = 0;
        player.velocityY = 0;
        DoraCake_group.setVelocityXEach(0);
        ob.setVelocityXEach(0);
        ob_inverted.setVelocityXEach(0);
        DoraCake_group.destroyEach();
        fill(rgb(255, 255, 255));
        textSize(80);
        text("Game Over !", windowWidth / 3, windowHeight / 2);
        textSize(40);
        text("\n Points : " + points + " and " + "HighScore : " + localStorage["HighScore"], windowWidth / 3.25, windowHeight / 1.75);
        text("Press 'r' To Restart", windowWidth / 2.75, windowHeight / 1.25);

        if (keyDown("r")) {
            obst.x = windowWidth + 50;
            game_state = "play";
            player.x = windowWidth / 10;
            player.y = windowHeight / 2;
            reset();
        }
    }
}

function obsticles() {
    if (frameCount % 121 == 0) {
        var obst = createSprite(windowWidth + 50, windowHeight / 8, 40, random(windowHeight / 4, windowHeight / 1.8));
        obst.velocityX = -5;
        obst.collide = edge[2];
        // obst.scale = random(1, 2);
        obst.addImage(ob_img);
        // obst.debug = true;
        obst.setCollider("rectangle", 0, 0, 150, 200);
        ob.add(obst);
    }
}

function obsticles_2() {
    if (frameCount % 121 == 0) {
        var obst_2 = createSprite(windowWidth + 50, windowHeight / 1.25, 40, random(windowHeight / 4, windowHeight / 1.8));
        obst_2.scale = random(0.4, 0.5);
        obst_2.velocityX = -5;
        // obst_2.debug = true;
        obst_2.setCollider("rectangle", 0, 0, 280, 650);
        obst_2.addImage(ob_inverted_img);
        ob_inverted.add(obst_2);
    }
}

function doracake() {
    if (frameCount % 198 == 0) {
        var dora = createSprite(windowWidth + 80, random(40, windowHeight - 60));
        dora.addImage(Dora_Cake_img);
        dora.velocityX = -5;
        dora.scale = 0.5;
        dora.depth = player.depth - 1;
        DoraCake_group.add(dora);
    }
}

function reset() {
    game_state = "play";
    player.x = windowWidth / 10;
    player.y = windowHeight / 2;
}