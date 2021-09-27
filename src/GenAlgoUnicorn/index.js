import RSGameEngine from '../RSGameEngine';
import Population from './Population';

// generate unicorn text using genetic algorithm

export default class GenAlgoUnicorn extends RSGameEngine {
  constructor() {
    super();
  }

  OnCreate() {
    let targetPhrase = 'unicorn';
    let populationMax = 200;
    let mutationRate = 0.02;

    this.m_population = new Population(
      targetPhrase,
      mutationRate,
      populationMax
    );

    this.gameObjects = [];
  }

  // place this function inside a loop to create generations (put in the Update() function)
  StartGeneticAlgorithm() {
    if (this.m_population.isFinished) return;

    this.m_population.calFitness();
    this.m_population.createSelectionPool();
    this.m_population.createGeneration();
    this.m_population.evaluate();
  }

  // overrided functions
  Update(deltaTime) {
    // this.gameObjects.forEach(ob => ob.update(deltaTime));
    this.StartGeneticAlgorithm();
  }

  Render() {
    // this.gameObjects.forEach(ob => ob.render());
  }
}
