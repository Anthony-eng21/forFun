import Bullet from "./Bullet.js";

export default class BulletController {
  bullets = []; //holds all of the {bullets}
  timeTilNextBulletAllowed = 0; //! 0 i important with the bullet mechanics because as soon as i hit space the first bullet needs to b fired

  constructor(canvas, maxBulletsAtATime, bulletColor, soundEnabled) {
    this.canvas = canvas;
    this.maxBulletsAtATime = maxBulletsAtATime;
    this.bulletColor = bulletColor;
    this.soundEnabled = soundEnabled;

    this.shootSound = new Audio("sounds/shoot.wav");
    this.shootSound.volume = 0.2; //cuts volume in half
  }

  draw(ctx) {
    this.bullets = this.bullets.filter(
      (bullet) => bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height
    ); //basically means that if the bullet is below the (/,0) at the top of the canvas and finds the bullets on the screen
    //this allows us to start back at 0 in the array once the bullet(s) leave the screen
    //after && uses the same formula for when enemies are shooting at bullet.y <= height

    this.bullets.forEach((bullet) => bullet.draw(ctx)); //draws the bullets
    if (this.timeTilNextBulletAllowed > 0) {
      this.timeTilNextBulletAllowed--; //stops at 10 because there can only be 10 bullets allowed on the screen/array at a time starting from 0
    }
  }

  collideWith(sprite) {
    const bulletThatHitSpriteIndex = this.bullets.findIndex((bullet) =>
      bullet.collideWith(sprite)
    );

    if (bulletThatHitSpriteIndex >= 0) {
      //bullet hit
      this.bullets.splice(bulletThatHitSpriteIndex, 1); //kills player
      return true; //can be removed from bullets list
    }

    return false;
  }

  shoot(x, y, velocity, timeTilNextBulletAllowed = 0) {
    if (
      this.timeTilNextBulletAllowed <= 0 && //every call on draw() we decrement from 10 to 0 to allow timeAllowedTilNextBullet,
      this.bullets.length < this.maxBulletsAtATime //help creates the gaps between the bullets
    ) {
      const bullet = new Bullet(this.canvas, x, y, velocity, this.bulletColor); //when we just call this it will throw an error
      // because it doesn't exist until i make a constructor()' on a different file.
      this.bullets.push(bullet); // new {bullet} pushes onto array of bullets
      if (this.soundEnabled) {
        this.shoot.currentTime = 0; //sometimes the sound will be playing and want to set it back to zero
        this.shootSound.play();
      }
      this.timeTilNextBulletAllowed = timeTilNextBulletAllowed;
    }
  }
}
