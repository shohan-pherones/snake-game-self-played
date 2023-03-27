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

  initSnakeBody() {
    this.body.push(
      new SnakeCell(
        this.head.col - 1,
        this.head.row,
        this.head.size,
        this.color
      )
    );
    this.body.push(
      new SnakeCell(
        this.head.col - 2,
        this.head.row,
        this.head.size,
        this.color
      )
    );
    this.body.push(
      new SnakeCell(
        this.head.col - 3,
        this.head.row,
        this.head.size,
        this.color
      )
    );
    this.body.push(
      new SnakeCell(
        this.head.col - 4,
        this.head.row,
        this.head.size,
        this.color
      )
    );
  }

  canvasDiagonal() {
    return Math.abs(
      Math.sqrt(
        (canvas_height / BLOCK_SIZE) * (canvas_height / BLOCK_SIZE) +
          (canvas_width / BLOCK_SIZE) * (canvas_width / BLOCK_SIZE)
      )
    );
  }

  think(apple) {
    let input = [
      this.checkFreeRight(),
      this.checkFreeLeft(),
      this.checkFreeInfront(),
      this.appleDagree(apple),
      this.decision(apple) / 10,
    ];

    let output = this.brain.predict(input);
    this.choice(output, apple);
  }

  appleDagree(apple) {
    if (this.decision == UP || this.decision == DOWN) {
      if (this.head.row == apple.row) {
        return map(Math.PI / 2, -Math.PI / 2, Math.PI / 2, -1, 1);
      }

      return map(
        Math.atan((this.head.col - apple.col) / (this.head.row - apple.row)),
        -Math.PI / 2,
        Math.PI / 2,
        -1,
        1
      );
    }

    if (this.head.col == apple.col) {
      return map(Math.PI / 2, -Math.PI / 2, Math.PI / 2, -1, 1);
    }

    return map(
      Math.atan(
        Math.abs(this.head.row - apple.row) /
          Math.abs(this.head.col - apple.col)
      ),
      -Math.PI / 2,
      Math.PI / 2,
      -1,
      1
    );
  }

  decision(apple) {
    switch (this.direction) {
      case UP:
        if (this.head.col > apple.col) {
          return TURN_LEFT;
        } else if (this.head.col < apple.col) {
          return TURN_RIGHT;
        }

        return DEFUALT;
      case RIGHT:
        if (this.head.row < apple.row) {
          return TURN_RIGHT;
        } else if (this.head.row > apple.row) {
          return TURN_LEFT;
        }

        return DEFUALT;
      case DOWN:
        if (this.head.col < apple.col) {
          return TURN_LEFT;
        } else if (this.head.col > apple.col) {
          return TURN_RIGHT;
        }

        return DEFUALT;
      case LEFT:
        if (this.head.row < apple.row) {
          return TURN_LEFT;
        } else if (this.head.row > apple.row) {
          return TURN_RIGHT;
        }

        return DEFUALT;
    }
  }

  pitagoras_third_vertex(a, b) {
    return Math.sqrt(a * a + b * b);
  }
}
