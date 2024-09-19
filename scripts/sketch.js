let ship;
let bullets = [];
let aliens = [];
let enemyBullets = [];
let backgroundImg;
let gameStarted = false;
let shipImage;
let alienImage;
let spawnInterval = 2000;
let spawnTimer;
let score;
let bgSound;
let blasterShot;
let deathSounds = [];
let gameOverSound;
let explosionGif;
let shakeOffset = 0;
const shakeSpeed = 0.02;

function preload() {
  shipImage = loadImage('./assets/nav.png');
  alienImage = loadImage('./assets/nav-inimiga.png');
  backgroundImage = loadImage('./assets/space-teste.png');

  bgSound = loadSound('./assets/bg-sound.mp3');
  blasterShot = loadSound('./assets/blaster-shot.mp3');
  deathSounds = [
    loadSound('./assets/death-sound-1.mp3'),
    loadSound('./assets/death-sound-2.mp3'),
    loadSound('./assets/death-sound-3.mp3'),
    loadSound('./assets/death-sound-4.mp3')
  ];
  gameOverSound = loadSound('./assets/game-over.mp3');
  explosionGif = createImg('./assets/explosion.gif');
  explosionGif.hide(); // Esconde o GIF até que seja necessário mostrá-lo
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundImg = new Background(backgroundImage); // Inicializa o fundo
  ship = new Ship();
  score = new Score(); // Inicializa a pontuação
  explosionGif = createImg('./assets/explosion.gif');
  explosionGif.size(50, 50); // Define o tamanho da explosão
  explosionGif.hide(); // Esconde o GIF até que seja necessário mostrá-lo
  noLoop();
}

function spawnAlien() {
  let margin = width * 0.25;
  let alienX = random(margin, width - margin);
  let alien = new Alien(alienImage, alienX);
  aliens.push(alien);
}

function draw() {
  if (!gameStarted) return;

  background(0);

  // Lógica de tremor no plano de fundo
  shakeOffset += shakeSpeed;
  if (shakeOffset > TWO_PI) shakeOffset -= TWO_PI;
  let shakeAmount = sin(shakeOffset) * 10;
  push();
  translate(shakeAmount, 0);
  backgroundImg.show(); // Exibe o fundo com o efeito de tremor
  pop();

  ship.show();
  ship.move();

  for (let bullet of bullets) {
    bullet.show();
    bullet.move();
  }

  for (let alien of aliens) {
    alien.update();
    alien.show();
    alien.move();
    alien.updateShootInterval(score.get()); // Atualiza o intervalo de tiro do alien com base na pontuação
  }

  checkCollisions();
  bullets = bullets.filter(bullet => !bullet.toDelete);
  aliens = aliens.filter(alien => !alien.toDelete);

  for (let bullet of enemyBullets) {
    bullet.show();
    bullet.move();
    if (bullet.hits(ship)) gameOver();
  }

  enemyBullets = enemyBullets.filter(bullet => !bullet.toDelete);

  for (let alien of aliens) {
    if (dist(ship.x + 25, ship.y + 25, alien.x + 25, alien.y + 25) < 25) {
      gameOver();
    }
  }

  score.show(); // Exibe o score na tela
}

function checkCollisions() {
  for (let bullet of bullets) {
    for (let alien of aliens) {
      if (bullet.hits(alien)) {
        alien.disappear();
        bullet.disappear();
        score.increment();

        let randomDeathSound = random(deathSounds);
        randomDeathSound.play(); // Toca um som de morte aleatório

        // Mostrar o GIF de explosão
        explosionGif.position(alien.x, alien.y);
        explosionGif.show();
        setTimeout(() => explosionGif.hide(), 500); // Esconde o GIF após 500ms
      }
    }
  }
}

function keyPressed() {
  if (gameStarted) {
    if (key === ' ') {
      let bullet = new Bullet(ship.x + 25, ship.y);
      bullets.push(bullet);
      blasterShot.play(); // Som de tiro
    }
    if (keyCode === SHIFT) {
      ship.setSpeed(ship.speed * 2); // Aumenta a velocidade ao pressionar SHIFT
    }
    handleArrowKeys(true); // Captura teclas de seta
  }
}

function keyReleased() {
  handleArrowKeys(false); // Libera as teclas de seta

  if (keyCode === SHIFT) {
    ship.setSpeed(5); // Retorna à velocidade padrão ao soltar SHIFT
  }
}

function handleArrowKeys(pressed) {
  if (keyCode === LEFT_ARROW) {
    ship.setDir(pressed ? -1 : 0, 'x'); 
  } else if (keyCode === RIGHT_ARROW) {
    ship.setDir(pressed ? 1 : 0, 'x'); 
  } else if (keyCode === UP_ARROW) {
    ship.setDir(pressed ? -1 : 0, 'y'); 
  } else if (keyCode === DOWN_ARROW) {
    ship.setDir(pressed ? 1 : 0, 'y'); 
  }
}

function startGame() {
  document.getElementById('menu').style.display = 'none';
  gameStarted = true;
  spawnTimer = setInterval(spawnAlien, spawnInterval);
  loop();
  bgSound.loop(); // Loop de som de fundo
}

function gameOver() {
  gameStarted = false;
  noLoop();
  clearInterval(spawnTimer);
  bgSound.stop(); // Para o som de fundo
  gameOverSound.play(); // Toca o som de game over
  alert("Game Over! Tente novamente.");
  location.reload();
}