class PlayerBullet extends Bullet {
    constructor(x, y) {
      super(x, y, 5);
    }
  
    move() {
      this.y -= this.speed;
    }
  }