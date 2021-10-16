const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var player, playerBase, playerArcher;
var playerArrows = [];
var board1, board2;
var numberOfArrows = 10;

var score = 0;

function preload() {
  backgroundImg = loadImage("./assets/background.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  playerBase = new playerBase(300, 500, 180, 150);
  player = new player(285, playerBase,body.position.y - 153, 50, 180);
  playerArcher = new playerArcher(340, playerBase.body.position.y - 180, 120, 120);

  board1 = new board1(width - 300, 330, 50, 200);
  board2 = new board1(width - 550, height - 300, 50, 200);
}

function draw() {
  background(backgroundImg);
  
  Engine.update(engine);

  playerBase.display();
  player.display();
  playerArcher.display();

  board1.display();
  board2.display();

  for(var i = 0; i < playerArrows.length; i++) {
    if (playerArrows[i] !== undefined) {
      playerArrows[i].display();

      var board1Collision = Matter.SAT.collides(board1.body, playerArrows[i].body);

      var board2Collision = Matter.SAT.collides(board2.body, playerArrows[i].body);

      if (board1Collision.collided || board2Collision.collided) {
        score += 5;
      }

      var posX = playerArrows[i].body.position.x;
      var posX = playerArrows[i].body.position.y;

      if (posX > width || posY > height) {
        if (!playerArrows[i].isRemoved) {
          playerArrows[i].remove(i);
        } else {
          playerArows[i].trajectory = [];
        }
      }
    }
  }

  //Title
  fill("A82EFF");
  textAlign("center");
  textSize(40);
  text("EPIC ARCHERY", width / 2, 100);

  //Score
  fill("FF0059");
  textAlign("center");
  textSize(30);
  text("Remaining Arrows : " + numberOfArrows, 200, 100);

  //Arrow Count
  fill("#91B2F2");
  textAlign("center");
  textSize(30);
  text("Remaining Arrows : " + numberOfArrows, 200, 100);
  
  if (numberOfArrows == 0) {
    gameOver();
  }
  
}