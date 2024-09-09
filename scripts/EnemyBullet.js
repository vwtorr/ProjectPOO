class EnemyBullet extends Bullet {
    constructor(x, y) {
      super(x, y, 5);
      this.targetX = null;
      this.targetY = null;
      this.direction = createVector(0, 0);
    }
  
    setTarget(targetX, targetY) {
      this.targetX = targetX;
      this.targetY = targetY;
      let targetVector = createVector(this.targetX - this.x, this.targetY - this.y);
      this.direction = targetVector.normalize().mult(this.speed);
    }
  
    move() {
      this.x += this.direction.x;
      this.y += this.direction.y;
      if (this.y > height || this.x < 0 || this.x > width) {
        this.disappear();
      }
    }
  }