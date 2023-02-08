import Enemy from "./enemy.js";
import MovingDirection from "./MovingDirection.js";
import movingDirection from "./MovingDirection.js";


export default class EnemyMovement{
    
    enemyMap = [
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], //[2, 3, 2, 3, 2, 3, 2, 3, 2, 3] og design
        [3, 1, 3, 1, 3, 1, 3, 1, 3, 1],
        [1, 3, 1, 3, 1, 3, 1, 3, 1, 3],
        [3, 1, 3, 1, 3, 1, 3, 1, 3, 1],
        [1, 3, 1, 3, 1, 3, 1, 3, 1, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 3], //[3, 1, 3, 1, 3, 1, 3, 1, 3, 1]og map design pattern
    ]; // 0 represents there is no enemyin that location also justifies the foreach()
    //   this array works with inner arrays and shows different numbers
    // that represent enemy objects and their pos. the enemy objects are made in another arr
    enemyRows = [];
    
    currentDirection = MovingDirection.right; //starts the game with the map moving right 
    xVelocity = 0; //moving right  
    yVelocity = 0; //moving left
    defaultxVelocity =  5; //decides that the enemies go faster than 0 by default 
    defaultyVelocity = 1; //these values are the "real" speed
    moveDownTimerDefault = 30; //changes direction after timers conts form 30-0 then moves down then horizontally
    moveDownTimer = this.moveDownTimerDefault;
    //some global variables for speed of enemy movement
    fireBulletTimerDefault = 100; // timer that decides when the enemy is going to fire a bullet decrements each time we draw
    fireBulletTimer = this.fireBulletTimerDefault;
    //consts for bullet mechs
    
    constructor(canvas, enemyBulletController, playerBulletController) {
        this.canvas = canvas;
        this.enemyBulletController = enemyBulletController; //distinct name because im going to b assigning the enemy and player controller
        this.playerBulletController = playerBulletController;        

        this.enemyDeathSound = new Audio('sounds/enemy-death.wav');
        this.enemyDeathSound.volume = 0.1;
        
        this.createEnemies();
    } // new constructor for enemy movemt draw();
  
  
    draw(ctx) { //implementation of draw method of the new constructor from index line
    this.decrementMoveDownTimer();
    this.updateVelocityandDirection();
    this.collisionDetection();
    this.drawEnemies(ctx);
    this.resetMoveDownTimer();
    // console.log(this.moveDownTimer);
    this.fireBullet();
    } 

    collisionDetection(){
        this.enemyRows.forEach((enemyRow) => {
            enemyRow.forEach((enemy, enemyIndex) => {
                if(this.playerBulletController.collideWith(enemy)) {
                    //play a sound
                    this.enemyDeathSound.currentTime = 0;
                    this.enemyDeathSound.play();
                    enemyRow.splice(enemyIndex, 1);
                }
            });
        });

        this.enemyRows = this.enemyRows.filter((enemyRow) => enemyRow.length > 0);
    }

    fireBullet(){
        this.fireBulletTimer--; //decrement of timer
        if(this.fireBulletTimer <= 1000){ //goes ahead and fires a bullet
            this.fireBulletTimer = this.fireBulletTimerDefault;
            const allEnemies = this.enemyRows.flat(); //flat() makes a flat "2d" surface for our enemies
            const enemyIndex = Math.floor(Math.random() * allEnemies.length); //gives us a random index position for the shooting of the enemy
            const enemy = allEnemies[enemyIndex]; //gets index
            this.enemyBulletController.shoot(enemy.x, enemy.y, -4); //(-3) negative due to how we made our bullet controller so the enemy shoots down and speed
            // console.log(enemyIndex); test enemy index that shoots the bullet
        }
    }

    resetMoveDownTimer(){
        if(this.moveDownTimer <= 0){ //
            this.moveDownTimer = this.moveDownTimerDefault; // reset this at 30 from 0 when moving horizontally then decrements to 0 when moving down
        }
    }

    decrementMoveDownTimer(){
        if(this.currentDirection === MovingDirection.downLeft || 
            this.currentDirection === movingDirection.downRight){
                this.moveDownTimer--; //decrements from 0 => 30 when mving dwn
            }
            
    }

    updateVelocityandDirection () {
        for(const enemyRow of this.enemyRows) { //looping over enemy moves for ( of)
            if(this.currentDirection == MovingDirection.right) {
                this.xVelocity = this.defaultxVelocity; // default 1
                this.yVelocity = 0; //checks if the furthest right enemy is touching the wall or not while looping over all the enemy positions
                const rightMostEnemy = enemyRow[enemyRow.length - 1];
                if(rightMostEnemy.x + rightMostEnemy.width >= this.canvas.width) { //checks if most right items is close to end of canvas 
                    this.currentDirection = movingDirection.downLeft; // hits edge then goes down then left
                    break; //exiting for loop early and improves some performance
                }
            } else if(this.currentDirection === MovingDirection.downLeft){
                this.xVelocity = 0; //this stops enemies from moving off the screen to the right then stops till ln 50
                this.yVelocity = this.defaultyVelocity;//this makes it so when the last {obj} is about to go off the canvas on the right it goes down on the y axis
                if(this.moveDown(MovingDirection.left)){
                    break; //changes direction when hits right 
                }
            } else if (this.currentDirection === MovingDirection.left){
                this.xVelocity = -this.defaultxVelocity;//moves the enemies move down then to the left diagonally until
                this.yVelocity = 0; // we change the yvelocity from 0ne to 0;
                const leftMostEnemy = enemyRow[0]; // checks the left most enemy on the enemy row
                if(leftMostEnemy.x <= 0) {
                    this.currentDirection = MovingDirection.downRight; //moves the enemies down to right 
                break; //performance is key
                }
            } else if(this.currentDirection === MovingDirection.downRight){
                if(this.moveDown(MovingDirection.right)){
                    break; //changes direction when hits right 
                } 
            }  
        }
    }

    moveDown(newDirection){
        this.xVelocity = 0;
        this.yVelocity = this.defaultyVelocity;
        if(this.moveDownTimer <= 0){ // uses movedown() if statement to break out of the for of when to change direction
            this.currentDirection = newDirection;
            return true;
        }
        return false;
    }

    drawEnemies(ctx){
        this.enemyRows.flat().forEach((enemy) => { //loop over all enemies and tell each enemy to draw itself
            enemy.move(this.xVelocity, this.yVelocity); //instructs enemies how to move determing on the $velocity globals 
        enemy.draw(ctx); //flat() makes a flat 2d "surface" for our array
        });
    }

    createEnemies() {
        this.enemyMap.forEach((row,rowIndex)=>{
            this.enemyRows[rowIndex] = []; //we've added the same amount of rows that are in our enemyMap == 6 to our enemyRows array
            row.forEach((enemyNumber, enemyIndex) => {
                if(enemyNumber > 0){// greater than 0 we can push the enemy into our list
                    this.enemyRows[rowIndex].push(
                    new Enemy(enemyIndex * 50, rowIndex * 35, enemyNumber)
                    ); //enemyNumber is the positon of our enemy in the enemyMap array use enemy index = column to set x positon of enemies row index is the y positon and the * 50, 35 gives us space between our enemies.
                } // using the row index and enemy index to position our {enemies}
            }); //we're gonna take a row that reps all the numbers to a particular row and map that to an enemy obj/png lol
            
        });
    }

    collideWith(sprite){
        return this.enemyRows.flat().some((enemy) => enemy.collideWith(sprite));
    }
}