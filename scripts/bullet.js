class Bullet {
  constructor(x, y, isEnemy = false) {
    this.x = x;
    this.y = y;
    this.isEnemy = isEnemy;
    this.toDelete = false;
    this.speed = 5;
    this.targetX = null;
    this.targetY = null;
    this.direction = createVector(0, 0);
  }

  show() {
    fill(this.isEnemy ? 'red' : 'yellow');
    noStroke();
    ellipse(this.x, this.y, 8, 20);
  }

  setTarget(targetX, targetY) {
    this.targetX = targetX;
    this.targetY = targetY;
    let targetVector = createVector(this.targetX - this.x, this.targetY - this.y);
    this.direction = targetVector.normalize().mult(this.speed);
  }

  move() {
    if (this.isEnemy) {
      this.x += this.direction.x;
      this.y += this.direction.y;
    } else {
      this.y -= this.speed;
    }

    if (this.y < 0 || this.y > height || this.x < 0 || this.x > width) {
      this.disappear();
    }
  }

  hits(ship) {
    let d = dist(this.x, this.y, ship.x + 25, ship.y + 25);
    return d < 25;
  }

  disappear() {
    this.toDelete = true;
  }
}