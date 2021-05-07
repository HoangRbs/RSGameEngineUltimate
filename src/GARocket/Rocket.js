import RSGameEngine from '../RSGameEngine';
import Vector2D from './Vector2D';

export default class Rocket {
    constructor(x, y, gameObj) {
        this.width = 10;
        this.height = 40;
        this.color = '#f3a058';

        /** @type {RSGameEngine} */
        this.m_game = gameObj;

        this.pos = new Vector2D(x, y);
        this.vel = new Vector2D(0, -100);
        this.acc = new Vector2D();
    }

    update(deltaTime) {
        this.vel.add(this.acc, deltaTime);
        this.pos.add(this.vel, deltaTime);
        this.acc.mult(0);
    }

    render() {
        this.m_game.FillRect(this.pos.x, this.pos.y, this.width, this.height, this.color);
    }
}