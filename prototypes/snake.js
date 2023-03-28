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

  checkFreeInfront() {
    switch (this.direction) {
      case UP:
        return this.head.row - 1 < 0 ||
          this.body.find(
            (cell) => cell.col == this.head.col && cell.row == this.head.row - 1
          ) != undefined
          ? 1
          : 0;

      case RIGHT:
        return this.head.col + 1 >= canvas_width / BLOCK_SIZE ||
          this.body.find(
            (cell) => cell.col == this.head.col + 1 && cell.row == this.head.row
          ) != undefined
          ? 1
          : 0;

      case DOWN:
        return this.head.row + 1 >= canvas_height / BLOCK_SIZE ||
          this.body.find(
            (cell) => cell.col == this.head.col && cell.row == this.head.row + 1
          ) != undefined
          ? 1
          : 0;

      case LEFT:
        return this.head.col - 1 < 0 ||
          this.body.find(
            (cell) => cell.col == this.head.col - 1 && cell.row == this.head.row
          ) != undefined
          ? 1
          : 0;
    }
  }

  checkFreeLeft() {
    switch (this.direction) {
      case UP:
        return this.head.col - 1 < 0 ||
          this.body.find(
            (cell) => cell.col == this.head.col - 1 && cell.row == this.head.row
          ) != undefined
          ? 1
          : 0;

      case RIGHT:
        return this.head.row - 1 < 0 ||
          this.body.find(
            (cell) => cell.col == this.head.col && cell.row == this.head.row - 1
          ) != undefined
          ? 1
          : 0;

      case DOWN:
        return this.head.col + 1 >= canvas_width / BLOCK_SIZE ||
          this.body.find(
            (cell) => cell.col == this.head.col + 1 && cell.row == this.head.row
          ) != undefined
          ? 1
          : 0;

      case LEFT:
        return this.head.row + 1 >= canvas_height / BLOCK_SIZE ||
          this.body.find(
            (cell) => cell.col == this.head.col && cell.row == this.head.row + 1
          ) != undefined
          ? 1
          : 0;
    }
  }

  checkFreeRight() {
    switch (this.direction) {
      case UP:
        return this.head.col + 1 >= canvas_width / BLOCK_SIZE ||
          this.body.find(
            (cell) => cell.col == this.head.col + 1 && cell.row == this.head.row
          ) != undefined
          ? 1
          : 0;

      case RIGHT:
        return this.head.row + 1 >= canvas_height / BLOCK_SIZE ||
          this.body.find(
            (cell) => cell.col == this.head.col && cell.row == this.head.row + 1
          ) != undefined
          ? 1
          : 0;

      case DOWN:
        return this.head.col - 1 < 0 ||
          this.body.find(
            (cell) => cell.col == this.head.col - 1 && cell.row == this.head.row
          ) != undefined
          ? 1
          : 0;

      case LEFT:
        return this.head.row - 1 < 0 ||
          this.body.find(
            (cell) => cell.col == this.head.col && cell.row == this.head.row - 1
          ) != undefined
          ? 1
          : 0;
    }
  }

  choice(output, apple) {
    let max = output[0];
    let indexMax = 0;

    for (let i = 0; i < output.length; i++) {
      if (max < output[i]) {
        max = output[i];
        indexMax = i;
      }
    }

    let oldCol = this.head.col;
    let oldRow = this.head.row;

    switch (indexMax) {
      case TURN_RIGHT:
        this.turnRight();

        break;
      case TURN_LEFT:
        this.turnLeft();

        break;
      case DEFUALT:
        this.moveDefault();

        break;
    }

    this.appleScore(oldCol, oldRow, apple);
  }

  appleDistance(apple) {
    return this.pitagoras_third_vertex(
      this.head.col - apple.col,
      this.head.row - apple.row
    );
  }

  appleScore(oldCol, oldRow, apple) {
    if (
      this.appleDistance(apple) <
      this.pitagoras_third_vertex(oldCol - apple.col, oldRow - apple.row)
    ) {
      this.fitness_score += 1;
    } else {
      this.fitness_score -= 1.5;
    }
  }

  turnRight() {
    switch (this.direction) {
      case UP:
        this.moveRight();

        break;
      case RIGHT:
        this.moveDown();

        break;
      case DOWN:
        this.moveLeft();

        break;
      case LEFT:
        this.moveUp();

        break;
    }
  }

  turnLeft() {
    switch (this.direction) {
      case UP:
        this.moveLeft();

        break;
      case RIGHT:
        this.moveUp();

        break;
      case DOWN:
        this.moveRight();

        break;
      case LEFT:
        this.moveDown();

        break;
    }
  }
}
