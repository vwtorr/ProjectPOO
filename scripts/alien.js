class Alien extends Entity {
  constructor(image, x) {
    super(x, 0);  // Chama o construtor da classe base (Entity) com posição inicial (x, y)
    this.image = image;
    this.baseShootInterval = 2000;
    this.shootInterval = this.baseShootInterval;
    this.shootTimer = 0;
    this.color = color(random(255), random(255), random(255));  // Cor aleatória
    this.speed = 2;  // Velocidade do alien
  }

  show() {
    tint(this.color);  // Aplica a cor
    image(this.image, this.x, this.y, 50, 50);  // Desenha a imagem do alien
    noTint();  // Remove a cor aplicada
  }

  shoot() {
    if (!this.toDelete) {
      let bullet = new Bullet(this.x + 25, this.y + 50, true);  // Cria um projétil inimigo
      bullet.setTarget(ship.x + 25, ship.y + 25);  // Define o alvo
      enemyBullets.push(bullet);  // Adiciona o projétil à lista
    }
  }

  update() {
    this.shootTimer += deltaTime;  // Atualiza o temporizador de tiro
    if (this.shootTimer > this.shootInterval && !this.toDelete) {
      this.shoot();  // Atira se o temporizador ultrapassar o intervalo
      this.shootTimer = 0;  // Reseta o temporizador
    }
  }

  updateShootInterval(score) {
    let level = Math.floor(score / 5);  // Aumenta a dificuldade a cada 5 pontos
    this.shootInterval = max(400, 2000 - level * 100);  // Diminui o intervalo de tiro com base na pontuação
  }

  move() {
    // Movimento para baixo
    this.y += this.speed;

    // Se o alien sair da tela, marca para ser removido
    if (this.y > height) {
      this.toDelete = true;
    }
  }
}