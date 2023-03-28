var save = [];

class GameManager {
  constructor(snake) {
    if (snake instanceof Snake) {
      this.snake = snake;
    } else {
      this.snake = new Snake(BLOCK_SIZE);
    }

    this.apple = new Apple(this.snake, BLOCK_SIZE);
    this.end = false;
    this.fitness = 0;
  }

  dispose() {
    this.snake.dispose();
  }

  score() {
    return this.snake.score;
  }

  time_to_apple() {
    return this.snake.time_to_apple;
  }

  fitness() {
    return this.fitness;
  }

  hunger() {
    return this.snake.hunger;
  }

  // Calculating the fitness score of a snake in a genetic algorithm based on its age, fitness score, and body length.
  calc_fitness() {
    let lifetime = this.snake.age + this.snake.fitness_score;
    let len = this.snake.body.length;

    if (len < 10) {
      this.fitness = Math.floor(
        lifetime * lifetime * Math.pow(2, Math.floor(len))
      );
    } else {
      this.fitness = lifetime * lifetime;
      this.fitness *= Math.pow(2, 10);
      this.fitness *= len - 9;
    }
  }

  // Drawing the game elements, checks if the game has ended, and calculates the fitness score for the individual.
  draw(save, population) {
    if (!this.snake.checkEnd()) {
      this.snake.think(this.apple);

      this.apple.draw();
      this.snake.draw();

      if (this.snake.appleOnHead(this.apple)) {
        this.snake.graw();
        this.apple.random_loc(this.snake);
      }
    } else {
      this.calc_fitness();

      population.splice(population.indexOf(this), 1);
      save.push(this);
      this.end = true;
    }
  }

  distanceFromApple() {
    return this.snake.appleDistance(this.apple);
  }

  copy() {
    return new GameManager(this.snake.copy());
  }
}
