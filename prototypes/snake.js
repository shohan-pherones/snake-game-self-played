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

  // Calculating the diagonal length of the canvas in terms of blocks.
  canvasDiagonal() {
    return Math.abs(
      Math.sqrt(
        (canvas_height / BLOCK_SIZE) * (canvas_height / BLOCK_SIZE) +
          (canvas_width / BLOCK_SIZE) * (canvas_width / BLOCK_SIZE)
      )
    );
  }

  // Neural network snake's decision-making function based on input features.
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

  // Calculate the relative direction of the apple from the snake's head.
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

  // Function to determine the direction the snake should turn based on the location of the apple relative to its head.
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

  // Calculates the length of the hypotenuse of a right triangle given the lengths of the other two sides using the Pythagorean theorem.
  pitagoras_third_vertex(a, b) {
    return Math.sqrt(a * a + b * b);
  }

  // Checks if there is a free space in front of the snake, returning 1 if there isn't and 0 if there is.
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

  // Check if there is a free cell on the left of the snake's head.
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

  // This function checks if there is a free space to the right of the snake's head based on its direction.
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

  // Chooses the highest output value from the neural network and performs the corresponding action. Also updates the apple score.
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

  copy() {
    return new Snake(BLOCK_SIZE, this.brain.copy());
  }

  graw() {
    this.score++;
    this.fitness_score += 3;

    switch (this.direction) {
      case UP:
        this.body.push(
          new SnakeCell(
            this.head.col,
            this.head.row + 1,
            this.head.size,
            this.color
          )
        );

        break;
      case DOWN:
        this.body.push(
          new SnakeCell(
            this.head.col,
            this.head.row - 1,
            this.head.size,
            this.color
          )
        );

        break;
      case LEFT:
        this.body.push(
          new SnakeCell(
            this.head.col + 1,
            this.head.row,
            this.head.size,
            this.color
          )
        );

        break;
      case RIGHT:
        this.body.push(
          new SnakeCell(
            this.head.col - 1,
            this.head.row,
            this.head.size,
            this.color
          )
        );

        break;
    }

    this.hunger = this.canvasDiagonal() * 3 + (this.body.length + 1);
  }

  headOnBody() {
    return this.body.find((cell) => cell.equals(this.head)) != undefined;
  }

  appleOnHead(apple) {
    return this.head.col == apple.col && this.head.row == apple.row;
  }

  appleOnBody(apple) {
    return (
      this.body.find(
        (cell) => cell.col == apple.col && cell.row == apple.row
      ) != undefined
    );
  }

  // Check if the snake has reached the end of the game, either by hitting the wall, its own body, or by running out of hunger.
  checkEnd() {
    return (
      this.head.col * this.head.size <= -1 * this.head.size ||
      this.head.col * this.head.size >= canvas_width ||
      this.head.row * this.head.size <= -1 * this.head.size ||
      this.head.row * this.head.size >= canvas_height ||
      this.headOnBody() ||
      this.hunger <= 0
    );
  }

  draw() {
    this.hunger--;
    this.age++;
    this.head.draw();
    this.body.forEach((cell) => cell.draw());
  }

  moveLeft() {
    this.direction = LEFT;
    this.moveCells();
    this.head.changeCol(this.head.col - 1);
  }

  moveRight() {
    this.direction = RIGHT;
    this.moveCells();
    this.head.changeCol(this.head.col + 1);
  }

  moveUp() {
    this.direction = UP;
    this.moveCells();
    this.head.changeRow(this.head.row - 1);
  }

  moveDown() {
    this.direction = DOWN;
    this.moveCells();
    this.head.changeRow(this.head.row + 1);
  }

  moveDefault() {
    switch (this.direction) {
      case UP:
        this.moveUp();

        break;
      case DOWN:
        this.moveDown();

        break;
      case LEFT:
        this.moveLeft();

        break;
      case RIGHT:
        this.moveRight();

        break;
    }
  }

  moveCells() {
    if (this.body.length > 1) {
      for (let i = this.body.length - 1; i > 0; i--) {
        this.body[i].duplicateProp(this.body[i - 1]);
      }

      this.body[0].duplicateProp(this.head);
    }
  }
}
