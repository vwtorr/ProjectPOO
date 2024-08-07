class Background {
  constructor(img) {
    this.img = img;
  }

  show() {
    image(this.img, 0, 0, width, height);
  }
}