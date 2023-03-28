const POPULATION_MAX = 100;

class GeneticAlgorithm {
  constructor() {
    this.population_count = POPULATION_MAX;
    this.population = [];
    this.save = [];
    this.generation_count = 0;
    this.bestAllTime = 0;

    this.init_population();
  }

  init_population() {
    for (let i = 0; i < this.population_count; i++) {
      this.population.push(new GameManager());
    }
  }

  maxHunger() {
    let max = 0;

    for (let i = 0; i < this.save.length; i++) {
      if (max < this.save[i].hunger()) {
        max = this.save[i].hunger();
      }
    }

    return max;
  }

  draw() {
    if (this.population.length == 0) {
      this.newGeneration();
    }

    this.population.forEach((game) => game.draw(this.save, this.population));
  }

  maxGame() {
    let max = 0;

    for (let i = 0; i < this.population.length; i++) {
      if (max < this.population[i].score()) {
        max = this.population[i].score();
      }
    }

    if (this.bestAllTime < max) {
      this.bestAllTime = max;
    }

    return max;
  }

  selection(sumFitness) {
    let rand = random();
    let index = 0;

    while (rand > 0 && index < this.save.length) {
      rand -= (this.fitness(this.save[index]) / sumFitness) * 10;
      index++;
    }

    return this.save[index - 1];
  }
}
