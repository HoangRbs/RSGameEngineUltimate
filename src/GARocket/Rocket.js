import RSGameEngine from '../RSGameEngine';
import Vector2D from './Vector2D';
import Individual_DNA from './Individual_DNA';
import Population from './Population';

const rocketAnglePlus = Math.PI / 2; // since the head rocket is up direction and
                                 // the canvas transformation is 90 degree compare to that
                                 // the rotation transformation must + this angle so 
                                 // the canvas to rotate the rocket properly

export default class Rocket {
    constructor(x, y, /** @type {RSGameEngine} */ gameObj) {
        this.width = 10;
        this.height = 40;
        this.color = 'rgba(189, 125, 9, 0.55)';
        this.m_game = gameObj;

        this.pos = new Vector2D(x, y);
        this.vel = new Vector2D();
        this.acc = new Vector2D();

        this.individual_dna = new Individual_DNA();
    }

    applyForce (/** @type {Vector2D} */force) {
        this.acc.x = force.x;
        this.acc.y = force.y;
    }

    update(deltaTime) {
        this.applyForce(this.individual_dna.genes[Population.genes_index_count]);

        this.vel.add(this.acc, deltaTime);
        this.pos.add(this.vel, deltaTime);
        this.acc.mult(0);
    }

    render() {
        this.rocketRotateAngle = this.vel.headingAngle("radian") + rocketAnglePlus;
        this.m_game.FillRectAndRotate(this.pos.x, this.pos.y, this.width, this.height, this.rocketRotateAngle, this.color);
    }
}