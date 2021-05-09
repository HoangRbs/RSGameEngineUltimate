import RSGameEngine from '../RSGameEngine';
import Rocket from './Rocket';

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
}   