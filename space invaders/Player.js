export default class Player {
  rightPressed = false;
  leftPressed = false;
  shootPressed = false;
  eventEnter = false;
  constructor(canvas, velocity, bulletController) {
    this.canvas = canvas;
    this.velocity = velocity;
    this.bulletController = bulletController;

    this.x = this.canvas.width / 2.15; //divide by two to center the player on the screen
    this.y = this.canvas.height - 75; //pops player up a little bit like padding sorta
    this.width = 50; //dimesion of player.png
    this.height = 48; //dimesion of player.png
    this.image = new Image(); //set {img}
    this.image.src = "img/img/player.png"; //src

    document.addEventListener("keydown", this.keydown); //knows when we are pressing down on any key
    document.addEventListener("keyup", this.keyup); // knows when we are pressing up on any key
  }

  draw(ctx) {
    if (this.shootPressed) {
      this.bulletController.shoot(this.x + this.width / 2, this.y, 4, 10); //takes in x and y starting pos gets the width then divides it by two and comes ou tin the middle of the {player}
    }
    this.move(); // calls the movedraw()
    this.collideWithWalls(); // checks boundaries
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  } // draws the player in the index main mechanics for everything

  collideWithWalls() {
    //left
    if (this.x < 0) {
      // MEANS if WE WENT PASS THE LEFT WALL
      this.x = 0; // hit 0 positon on the left wall
    }
    //right
    if (this.x > this.canvas.width - this.width) {
      this.x = this.canvas.width - this.width; //assures that the player will always be on the edge when it draws and wont go past the differenciated width of the canvas.width
    }
  }

  move() {
    if (this.rightPressed) {
      this.x += this.velocity; //if the right press is true moves right on x axis
    } else if (this.leftPressed) {
      this.x += -this.velocity; //if the left press is true moves left on x axis
    }
  }

  keydown = (event) => {
    //for when we press down on the keys
    if (event.code == "ArrowRight") {
      this.rightPressed = true;
    }
    if (event.code == "ArrowLeft") {
      this.leftPressed = true;
    }
    if (event.code == "Space") {
      //space event listener for shooting
      this.shootPressed = true;
    }
  };

  keyup = (event) => {
    //for when you're not pressing down on a key so that you can change keys and execute same keydown();
    if (event.code == "ArrowRight") {
      this.rightPressed = false;
    }
    if (event.code == "ArrowLeft") {
      this.leftPressed = false;
    }
    if (event.code == "Space") {
      this.shootPressed = false;
    }
  };
}
