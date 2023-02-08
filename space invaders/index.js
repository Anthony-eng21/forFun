import EnemyMovement from "./EnemyMovement.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// function main(currentTime) {
//     if (isGameOver){
//         (confirm('You are so FUCKING ASS!!!!! Press OK to restart')) {//lose state
//             window.location.reload()
//         }
//         return
//     }
// // ctx is the canvas context variable
canvas.width = 600;
canvas.height = 600;
// drawing the canvas dimensions

const background = new Image();
background.src = "img/img/space.png";

const playerBulletController = new BulletController(canvas, 10, "red", true); //canvas knows when bullets go off the screen
//10 param is the amount of bullets that can be used at one time
//"red" is the color of the bullets
const enemyBulletController = new BulletController(canvas, 7, "white", false); //(4) amt of enmy blts on screen, (white) = color, (false) for the sound we dont want a sound for when the enemy shoots
const enemyMovement = new EnemyMovement(
  canvas,
  enemyBulletController,
  playerBulletController
); //(new)instance of the enemy movement passing canvas and bullet mechanics
// playerBulletController is passed to check for bullet detection
const player = new Player(canvas, 10, playerBulletController); //callback from /player.js/ player(canvas, velocity) player speed and bullet mechanics

let isGameOver = false;
let didWin = false;

function loopGame() {
  checkGameOver();
  // console.log("loopGame") //test if loop is running
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height); //0,0 is important thats where the canvas draws by default

  displayGameOver(); //check to see if we win
  if (!isGameOver) {
    //if the games is not over run this loop
    enemyMovement.draw(ctx); //passes $ctx telling the loop to go ahead
    // and draw the enemy movement this funciton alone on the /index/ will throw an error
    // that the draw() has not been implemented
    player.draw(ctx); //draws player() logic from /player/
    playerBulletController.draw(ctx); //draws the bullets and their mechanics from /BulletController/
    enemyBulletController.draw(ctx); //draws enemy bullets and their mechanics from /BulletController/
    // console.log(isGameOver); testing checkGameOver function
  }
}

function displayGameOver() {
  if (isGameOver) {
    //if the game is over do this

    let text = didWin ? "UWin Big Dawg" : "Game Over Brotha";
    let textOffset = didWin ? 5 : 8; // 5:8 is the ratio of words to center in the canvas

    ctx.fillStyle = "purple"; 
    ctx.font = "55px Arial";
    ctx.fillText(text, canvas.width / textOffset, canvas.height / 2); //gets the text offset / 4 is set the message at 1/4 of the canvas
  }
}
// function displayRestart(didWin) {
//     if (isGameOver){
//         (confirm('You are so FUCKING ASS!!!!! Press OK to restart')) //lose state
//             window.location.reload()
//         }
//         return;
//     }

function checkGameOver() {
  if (isGameOver) {
    return;
  }
  if (enemyBulletController.collideWith(player)) {
    //use collide with to check is enemybullet collides() with our player that we pass in
    isGameOver = true; //reuse code we wrote to make code implement FASTER THAN WITH ENEMY COLLISON
  }

  if (enemyBulletController.collideWith(player)) {
    isGameOver = true;
  }

  if (enemyMovement.collideWith(player)) {
    isGameOver = true;
  }

  if (enemyMovement.enemyRows.length === 0) {
    //winning if statement .length === 0 because that means that there is no more enemies in the array
    didWin = true;
    isGameOver = true;
  }
}

setInterval(loopGame, 1000 / 70);
// setInterval = drawing this game
// 60X per second with this game loop ABOVE (loopGame();
