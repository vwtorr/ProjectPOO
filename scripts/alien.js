class Alien {
  constructor(image, x) {
    this.x = x;
    this.y = 0;
    this.toDelete = false;
    this.image = image;
    this.baseShootInterval = 2000;
    this.shootInterval = this.baseShootInterval;
    this.shootTimer = 0;
    this.color = color(random(255), random(255), random(255));
  }

  show() {
    tint(this.color);
    image(this.image, this.x, this.y, 50, 50);
    noTint();
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

  // AUMENTO DE DIFICULDADE AQUI
  updateShootInterval(score) {
    let level = Math.floor(score / 5); // Aumenta a dificuldade a cada 5 pontos
    this.shootInterval = max(400, 2000 - level * 100); // Intervalo de tiro diminui com a pontuação
  }

  disappear() {
    this.toDelete = true;
  }

  setImage(image) {
    this.image = image;
  }
}

// Função para atualizar o intervalo de spawn dos Aliens
function updateSpawnInterval() {
  let level = Math.floor(score.get() / 5); // Aumenta a dificuldade a cada 5 pontos
  let newInterval = max(400, 2000 - level * 100); // Intervalo de spawn diminui com a pontuação
  if (newInterval !== spawnInterval) {
    clearInterval(spawnTimer);
    spawnInterval = newInterval;
    spawnTimer = setInterval(spawnAlien, spawnInterval);
  }
}
