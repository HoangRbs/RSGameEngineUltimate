import Individual from './Individual';
import * as utils from './utils';

export default class Population {
  constructor(targetPhrase, mutationRate, numPopulation) {
    this.targetPhrase = targetPhrase; // the target phrase we're archiving "unicorn"
    this.population = [];
    this.selectionPool = [];
    this.mutationRate = mutationRate;
    this.bestPhrase = '';
    this.isFinished = false;
    this.perfectScore = 1; // 100%

    // generate population
    for (let i = 0; i < numPopulation; i++) {
      this.population.push(new Individual(target.length));
    }

    // calulate fitness initially
    this.calFitness();
  }

  calFitness() {
    // caculating fitness score of all individuals
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].calFitness(this.targetPhrase);
    }
  }

  createSelectionPool() {
    this.selectionPool = []; // a pool to select parents

    // get max fitness
    let maxFitness = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > maxFitness)
        maxFitness = this.population[i].fitness;
    }

    // start creating pool for selection
    for (let i = 0; i < this.population.length; i++) {
      // get output value between 0 and 1 and times that by 100 to get the numbers of elements ..
      //.. will be created in the selection pool
      // the more elements , the higher chance it will be picked as parent
      let outFitnessVal = utils.scaleNumberInRange(
        this.population[i].fitness,
        0,
        maxFitness,
        0,
        1
      );
      let n = Math.floor(outFitnessVal * 100);
      for (let j = 0; j < n; j++) {
        this.selectionPool.push(this.population[i]);
      }
    }
  }

  createGeneration() {
    // refill the population with new children -> new generation
    for (let i = 0; i < this.population.length; i++) {
      // pick 2 random elements from the selection pool
      let a = utils.genRndInteger(0, this.selectionPool.length);
      let b = utils.genRndInteger(0, this.selectionPool.length);

      let partnerA = this.selectionPool[a];
      let partnerB = this.selectionPool[b];

      // create a new child
      let child = partnerA.crossOver(partnerB);

      // Mutation occurs to maintain diversity within the population and prevent premature convergence.
      child.mutate(this.mutationRate);

      this.population[i] = child;
    }
  }

  // Compute the current "most fit" member of the population
  evaluate() {
    let worldrecord = 0.0;
    let index = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > worldrecord) {
        index = i;
        worldrecord = this.population[i].fitness;
      }
    }

    this.bestPhrase = this.population[index].getPhrase();
    if (worldrecord === this.perfectScore) {
      this.isFinished = true;
    }
  }
}
