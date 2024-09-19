class Score {
  constructor() {
    this.value = 0;
    this.maxSpeedInterval = 500;
    this.color = color(255);
  }

  increment() {
    this.value++;
    this.updateAliensShootInterval();
    this.updateScoreColor();
  }

  get() {
    return this.value;
  }

  show() {
    textSize(32);
    textAlign(CENTER, CENTER);
    let scoreText = 'Score: ' + this.value;

    let textWidth = this.getTextWidth(scoreText);
    let textHeight = this.getTextHeight();

    let x = 80;
    let y = 40;

    stroke(255);
    strokeWeight(2);
    noFill();
    rectMode(CENTER);
    rect(x, y, textWidth + 20, textHeight + 20);

    fill(this.color);
    noStroke();
    text(scoreText, x, y);
  }

  getTextWidth(text) {
    textSize(32);
    return textWidth(text);
  }

  getTextHeight() {
    textSize(32);
    return textAscent() + textDescent();
  }

  updateScoreColor() {
    let isMaxSpeed = aliens.some(alien => alien.shootInterval <= this.maxSpeedInterval);
    this.color = isMaxSpeed ? color(255, 0, 0) : color(255);
  }
}