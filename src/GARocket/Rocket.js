import Vector2D from './Vector2D';
import Individual_DNA from './Individual_DNA';
import Population from './Population';
import * as utils from './utils';
import GA_Rocket from '.';

const rocketAnglePlus = Math.PI / 2; // since the head rocket is up direction and
// the canvas transformation is 90 degree compare to that
// the rotation transformation must + this angle so 
// the canvas to rotate the rocket properly

export default class Rocket {
    constructor(x, y, /** @type {GA_Rocket} */ gameObj, dna) {
        this.width = 10;
        this.height = 40;
        this.color = 'rgba(189, 125, 9, 0.55)';
        this.m_game = gameObj;

        this.pos = new Vector2D(x, y);
        this.vel = new Vector2D();
        this.acc = new Vector2D();

        this.fitness = 0; // fitness run from 0 --> 1
        this.reachTheTarget = false;

        this.m_timerCount = 0; // to calculate the "time" it reaches the target, effects the fitness as well

        if (dna) this.individual_dna = dna;
        else this.individual_dna = new Individual_DNA();
    }

    applyForce(/** @type {Vector2D} */force) {
        this.acc.x = force.x;
        this.acc.y = force.y;
    }

    calFitness() {
        if (this.reachTheTarget) {
            this.fitness = 1;
        } else {
            this.fitness = 0.05;

            let disToTarget = utils.distanceOf(this.pos, this.m_game.target.pos);

            // if distance is greater than canvas height -> fitness ~~ 0
            if (disToTarget < this.m_game.m_canvasHeight) {
                // after scale: distance = 500 close to 600 --> then scale = 0.9
                // --> fitness = 1 - 0.9 = 0.1;
                this.fitness = 1 - utils.scaleNumberInRange(disToTarget, 0, this.m_game.m_canvasHeight, 0, 1);
            }
        }

        // timer reaching the target effects the fitness
        // this.fitness -= this.m_timerCount / 3000;
        // if (this.fitness < 0) this.fitness = 0;
    }

    update(deltaTime) {
        if (utils.distanceOf(this.pos, this.m_game.target.pos) < 20) {
            this.reachTheTarget = true;
            this.pos = this.m_game.target.pos;
        }

        this.applyForce(this.individual_dna.genes[Population.genes_index_count]);

        if (!this.reachTheTarget) {
            this.vel.add(this.acc, deltaTime);
            this.pos.add(this.vel, deltaTime);
            this.acc.mult(0);

            this.m_timerCount++;
        }
    }

    render() {
        this.rocketRotateAngle = this.vel.headingAngle("radian") + rocketAnglePlus;
        this.m_game.FillRectAndRotate(this.pos.x, this.pos.y, this.width, this.height, this.rocketRotateAngle, this.color);
    }
}