class Apple {
  constructor(snake, size) {
    this.size = size;
    this.color = color(255, 0, 0);
    this.color.setAlpha(100);
    this.random_loc(snake);
  }

  draw() {
    fill(this.color);
    rect(this.col * this.size, this.row * this.size, this.size, this.size);
  }

  random_loc(snake) {
    this.col = Math.floor(random(canvas_width / this.size));
    this.row = Math.floor(random(canvas_height / this.size));

    while (
      snake.appleOnBody(this) ||
      this.col == canvas_width / this.size - 1 ||
      this.row == canvas_height / this.size - 1 ||
      this.col == 0 ||
      this.row == 0
    ) {
      this.col = Math.floor(random(canvas_width / this.size));
      this.row = Math.floor(random(canvas_height / this.size));
    }
  }
}
