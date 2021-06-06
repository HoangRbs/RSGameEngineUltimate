import Rocket from './Rocket';
import Individual_DNA from './Individual_DNA';
import GA_Rocket from '.';
import * as utils from './utils';

export default class Population {
    constructor(/** @type {GA_Rocket} */ gameObj) {
        this.rockets = [];
        this.populationSize = 25;
        this.m_game = gameObj;
        this.selectionPool = [];
        this.selectionPoolSize = 0;
        this.maxFitness = 0;

        for (let i = 0; i < this.populationSize; i++) {
            this.rockets[i] = new Rocket(this.m_game.m_canvasWidth / 2, this.m_game.m_canvasHeight - 80, this.m_game);
        }
    }

    getRockets() { return this.rockets; }

    evaluate() {
        this.maxFitness = 0;

        // calculate fitness of all the rockets
        for (let i = 0; i < this.populationSize; i++) {
            this.rockets[i].calFitness();
            if (this.rockets[i].fitness > this.maxFitness) this.maxFitness = this.rockets[i].fitness;
        }

        // show max fitness to display
        this.m_game.maxFitnessDisplay.changeText(`max fitness: ${this.maxFitness}`);

        // create selection pool, a pool to select parents
        this.selectionPool = []; // empty the pool again to select parents from each new generation
        this.selectionPoolSize = 0;

        for (let i = 0; i < this.populationSize; i++) {
            let n = this.rockets[i].fitness * 100;

            if (this.rockets[i].fitness >= 0.4) n += 5;
            if (this.rockets[i].fitness >= 0.7) n += 10;
            if (this.rockets[i].fitness >= 0.75) n += 20;
            if (this.rockets[i].fitness >= 0.80) n += 30;
            if (this.rockets[i].fitness >= 0.85) n += 40;
            if (this.rockets[i].fitness >= 0.90) n += 50;

            for (let j = 0; j < n; j++) {
                this.selectionPool.push(this.rockets[i]);
                this.selectionPoolSize++;
            }
        }
    }

    // select 2 random parents and make a new child
    // and refill the population
    naturalSelection() {
        let parentA_DNA;
        let parentB_DNA;
        let child_DNA;
        let newRockets = [];    // new generation

        for (let i = 0; i < this.populationSize; i++) {
            /** @type {Individual_DNA} */
            parentA_DNA = utils.getRandomEl(this.selectionPool, this.selectionPoolSize).individual_dna;
            parentB_DNA = utils.getRandomEl(this.selectionPool, this.selectionPoolSize).individual_dna;
            child_DNA = parentA_DNA.crossOver(parentB_DNA);
            child_DNA.mutation(this.maxFitness);

            let newRocket = new Rocket(this.m_game.m_canvasWidth / 2, this.m_game.m_canvasHeight - 80, this.m_game, child_DNA);
            newRockets.push(newRocket);
        }

        this.rockets = newRockets;
    }

    // global variables ------------------------------------------

    // run from 0 to Individual genes length
    // inside Rocket.js update ()
    static genes_index_count = 0;

    static isReachGenesLength() {
        return Population.genes_index_count === Individual_DNA.genes_len;
    }

    // inside index.js Update()
    static updateGenesIndexCount() {
        // increment gene index at a random vector in the genes array of each Rocket's DNA
        Population.genes_index_count++;
    }
}