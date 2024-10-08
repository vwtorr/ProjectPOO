class Ship extends Entity {
  constructor() {
    super(width / 2, height - 60); // Posição inicial
    this.xdir = 0;
    this.ydir = 0;
    this.speed = 5; // Velocidade inicial padrão
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
    // Garante que a velocidade seja um valor aceitável
    this.speed = max(0, newSpeed);
  }

  move() {
    // Move a nave com base na direção e velocidade
    this.x += this.xdir * this.speed;
    this.y += this.ydir * this.speed;

    // Mantém a nave dentro da tela
    this.x = constrain(this.x, 0, width - 50);
    this.y = constrain(this.y, 0, height - 50);
  }
}