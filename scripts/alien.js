class Alien {
  constructor(image, x) {
    this.x = x;  // Usa a posição X passada como argumento
    this.y = 0;
    this.toDelete = false;
    this.image = image;
    this.baseShootInterval = 2000;
    this.shootInterval = this.baseShootInterval;
    this.shootTimer = 0;
  }

  show() {
    image(this.image, this.x, this.y, 50, 50);
  }

  move() {
    this.y += 2;
    if (this.y > height) {
      this.toDelete = true;
    }
  }

  shoot() {
    if (!this.toDelete) {
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
    this.toDelete = true;
  }

  setImage(image) {
    this.image = image;
  }
}