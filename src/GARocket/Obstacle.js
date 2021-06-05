import GA_Rocket from '.';
import Vector2D from './Vector2D';

export default class Obstacle {
    constructor(x, y, width, height, gameobj) {
        this.pos = new Vector2D(x, y);
        this.width = width;
        this.height = height;
        this.color = 'rgba(189, 125, 9, 0.55)';

        /** @type {GA_Rocket} */
        this.m_game = gameobj;
    }

    update(deltaTime) {

    }

    render() {
        this.m_game.FillRect(this.pos.x, this.pos.y, this.width, this.height, this.color);
    }
}