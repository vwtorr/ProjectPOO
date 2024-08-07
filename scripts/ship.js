class Ship {
  constructor() {
    this.x = width / 2;
    this.y = height - 60;
    this.xdir = 0;
    this.ydir = 0;
    this.moveSpeed = 5;
  }

  show() {
    image(shipImage, this.x, this.y, 50, 50);
  }

  setDir(dir, axis) {
    if (axis === 'x') {
      this.xdir = dir;
    } else if (axis === 'y') {
      this.ydir = dir;
    }
  }

  setSpeed(newSpeed) {
    this.moveSpeed = newSpeed;
  }

  move() {
    this.x += this.xdir * this.moveSpeed;
    this.y += this.ydir * this.moveSpeed;
    this.x = constrain(this.x, 0, width - 50);
    this.y = constrain(this.y, 0, height - 50);
  }
}