export default class Enemy {

constructor(x,y,imageNumber){
    this.x = x; //assigning x position 
    this.y = y; //assigning y position 
    //instead of assigning a new image we're gonna create one
    this.width = 44;
    this.height = 32;
    //dimensions of png pictures 
    this.image = new Image()
    this.image.src = `img/img/enemy${imageNumber}.png`;//string interpelation in this case gets the images dynamically and gets the information/[pos] from the enemyMap array
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height); //this funciton was declared earlier in the code in the /enemyMovement.js/ on line 20 now its implemented
    }

    move(xVelocity, yVelocity){
        this.x += xVelocity; //this is the declaration for enemy.move(); /enemyMovement/ onl ine 49 and uses logic from the direction()'s and the velocity variable and funciton logic.
        this.y += yVelocity;
    }
    collideWith(sprite) { //using axis bounding collision box detection 
        if (
            this.x + this.width > sprite.x &&
            this.x < sprite.x + sprite.width &&
            this.y + this.height > sprite.y &&
            this.y < sprite.y + sprite.height
        ) {
            return true; //then the enemies hit us
        } else {
            return false;
        }
    }
}  