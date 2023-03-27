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
}
