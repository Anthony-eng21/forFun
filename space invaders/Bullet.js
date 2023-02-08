export default class Bullet {
  constructor(canvas, x, y, velocity, bulletColor) {
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.bulletColor = bulletColor;

    this.width = 5; // dimension of bullet
    this.height = 20; //dimension of the bullet
  }

  draw(ctx) {
    this.y -= this.velocity; //has to be a negative velocity to go up from where we are shooting from because (0,0) is on the top left of the canvas
    ctx.fillStyle = this.bulletColor; //"red"
    ctx.fillRect(this.x, this.y, this.width, this.height); //making rectangle bullets
  }
  collideWith(sprite) {
    //using axis bounding collision box detection
    if (
      this.x + this.width > sprite.x &&
      this.x < sprite.x + sprite.width &&
      this.y + this.height > sprite.y &&
      this.y < sprite.y + sprite.height
    ) {
      return true;
    } 
      return false;
  }
}
