let ship;
let bullets = [];
let aliens = [];
let enemyBullets = [];
let backgroundImage;
let backgroundImg;
let gameStarted = false;
let shipImage;
let alienImage;
let spawnInterval = 2000;
let spawnTimer;

function preload() {
  shipImage = loadImage('./assets/nav.png');
  alienImage = loadImage('./assets/nav-inimiga.png');
  backgroundImage = loadImage('./assets/space-teste.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundImg = new Background(backgroundImage);
  ship = new Ship();
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
  backgroundImg.show();
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
}

function checkCollisions() {
  for (let bullet of bullets) {
    for (let alien of aliens) {
      if (bullet.hits(alien)) {
        alien.disappear();
        bullet.disappear();
      }
    }
  }
}

function keyPressed() {
  if (gameStarted && key === ' ') {
    let bullet = new Bullet(ship.x + 25, ship.y);
    bullets.push(bullet);
  }
  handleArrowKeys(true);
  if (keyCode === SHIFT) {
    ship.setSpeed(ship.moveSpeed * 2);
  }
}

function keyReleased() {
  handleArrowKeys(false);
  if (keyCode === SHIFT) {
    ship.setSpeed(5);
  }
}

function handleArrowKeys(pressed) {
  if (keyCode === LEFT_ARROW) ship.setDir(pressed ? -1 : 0, 'x');
  else if (keyCode === RIGHT_ARROW) ship.setDir(pressed ? 1 : 0, 'x');
  else if (keyCode === UP_ARROW) ship.setDir(pressed ? -1 : 0, 'y');
  else if (keyCode === DOWN_ARROW) ship.setDir(pressed ? 1 : 0, 'y');
}

function startGame() {
  document.getElementById('menu').style.display = 'none';
  gameStarted = true;
  spawnTimer = setInterval(spawnAlien, spawnInterval);
  loop();
}

function gameOver() {
  gameStarted = false;
  noLoop();
  clearInterval(spawnTimer);
  alert("Game Over! Tente novamente.");
  location.reload();
}
