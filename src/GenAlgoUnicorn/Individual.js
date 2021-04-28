import * as utils from './utils';

export default class Individual {
    constructor(phraseLength) {
        this.genes = [];    // genes is an array of char which is random phrase
        this.fitness = 0;

        // generate random phrase 
        for (let i = 0; i < phraseLength; i++) {
            this.genes.push(utils.genRndChar());
        }
    }

    // the calFitness function is the key of Genetic algorithm
    // calculating fitness score with the target pharse "unicorn"
    // idea: current individual is "unijorm" then fitness score is "5"
    calFitness(target) {
        let score = 0;
        for (let i = 0; i < this.genes.length; i++) {
            if (this.genes[i] == target.charAt(i)) {
                score++;
            }
        }

        this.fitness = score / target.length;
    }

    /** @type {Individual} */
    crossOver(/** @type {Individual} */ partner) {
        // new child
        let child = new Individual(this.genes.length);

        // get random midpoint
        let midPoint = utils.genRndInteger(0, this.genes.length);

        for (let i = 0; i < this.genes.length; i++) {
            if (i <= midPoint) child.genes[i] = partner.genes[i];
            else child.genes[i] = this.genes[i];
        }

        return child;
    }

    mutate(mutationRate) {
        // if the random value < mutation rate -> mutate the character
        for (let i = 0; i < this.genes.length; i++) {
            if (utils.genRndInteger(0, 1) < mutationRate) {
                this.genes[i] = utils.genRndChar();
            }
        }
    }

    // Converts character array to a String
    getPhrase() {
        return this.genes.join("");
    }
}