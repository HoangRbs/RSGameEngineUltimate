import RSGameEngine from '../RSGameEngine';
import Rocket from './Rocket';
import Individual_DNA from './Individual_DNA';

export default class Population {
    constructor (/** @type {RSGameEngine} */ gameObj) {
        this.rockets = [];
        this.populationSize = 25;
        this.m_game = gameObj;

        for (let i = 0; i < this.populationSize; i++) {
            this.rockets[i] = new Rocket(this.m_game.m_canvasWidth / 2,  this.m_game.m_canvasHeight - 40, this.m_game);
        }
    }

    getRockets () { return this.rockets; }

    // global variables

    // run from 0 to Individual genes length
    // inside Rocket.js update ()
    static genes_index_count = 0; 

    static isReachGenesLength() {
        return Population.genes_index_count === Individual_DNA.genes_len;
    }

    // inside index.js Update()
    static updateGenesIndexCount () {
        Population.genes_index_count++;
    }
}   