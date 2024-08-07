class Alien {
  constructor(image, x) {
    this.x = x;
    this.y = 0;
    this.toDelete = false;
    this.exploding = false;
    this.explosionTimer = 0;
    this.baseShootInterval = 2000;
    this.shootInterval = this.baseShootInterval;
    this.shootTimer = 0;
    this.image = image;
    this.color = randomColor();
  }

  show() {
    if (this.exploding) {
      image(explosionGif, this.x, this.y, 50, 50);
      this.explosionTimer += deltaTime;
      if (this.explosionTimer > 500) {
        this.toDelete = true;
      }
    } else {
      tint(this.color);
      image(this.image, this.x, this.y, 50, 50);
      noTint();
    }
  }

  move() {
    this.y += 2;
    if (this.y > height) {
      this.toDelete = true;
    }
  }

  shoot() {
    if (!this.toDelete && !this.exploding) {
      let bullet = new Bullet(this.x + 25, this.y + 50, true);
      bullet.setTarget(ship.x + 25, ship.y + 25);
      enemyBullets.push(bullet);
    }
  }

  update() {
    this.shootTimer += deltaTime;
    if (this.shootTimer > this.shootInterval && !this.toDelete) {
      this.shoot();
      this.shootTimer = 0;
    }
  }

  disappear() {
    this.exploding = true;
    this.toDelete = false;
    this.explosionTimer = 0;
  }

  setImage(image) {
    this.image = image;
  }

  setColor(color) {
    this.color = color;
  }
}