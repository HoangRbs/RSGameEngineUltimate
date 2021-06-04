import Vector2D from './Vector2D';
import * as utils from './utils';

// Rocket Individual - Rocket DNA

export default class Individual_DNA {
    constructor(genes) {
        if (genes) {
            this.genes = genes;
        } else {
            // genes contains bunch of random force vector which push the rocket
            // a rocket will go through all force, a force each frame
            this.genes = [];

            for (let i = 0; i < Individual_DNA.genes_len; i++) {
                this.genes[i] = Vector2D.random2D();
                this.genes[i].mult(8); // random generated force is too small so scale to 10X
            }
        }
    }

    /** @type {Individual_DNA} */
    crossOver(/** @type {Individual_DNA} */partnerDNA) {
        let newGenes = [];
        let mid = utils.genRndInteger(0, Individual_DNA.genes_len);

        for (let i = 0; i < Individual_DNA.genes_len; i++) {
            if (i < mid) newGenes[i] = this.genes[i];
            else newGenes[i] = partnerDNA.genes[i];
        }

        return new Individual_DNA(newGenes);
    }

    // global variable
    static genes_len = 250;
}