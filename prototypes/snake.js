const INIT_X = 100;
const INIT_Y = 100;
const UP = "UP";
const DOWN = "DOWN";
const RIGHT = "RIGHT";
const LEFT = "LEFT";
const TURN_RIGHT = 0;
const TURN_LEFT = 1;
const DEFUALT = 2;

class Snake {
  constructor(size, brain) {
    if (brain instanceof Brain) {
      this.brain = brain;
    } else {
      this.brain = new Brain();
    }

    this.score = 0;
    this.fitness_score = 0;
    this.color = color(0, 255, 0);
    this.head = new SnakeCell(
      INIT_X / BLOCK_SIZE,
      INIT_Y / BLOCK_SIZE,
      BLOCK_SIZE,
      this.color
    );
    this.body = [];
    this.direction = RIGHT;
    this.age = 0;

    this.initSnakeBody();

    this.hunger = this.canvasDiagonal() * 3 + (this.body.length + 1);
  }

  dispose() {
    this.brain.dispose();
  }
}
