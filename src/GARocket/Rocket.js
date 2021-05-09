import RSGameEngine from '../RSGameEngine';
import Vector2D from './Vector2D';

const rocketAnglePlus = Math.PI / 2; // since the head rocket is up direction and
                                 // the canvas transformation is 90 degree compare to that
                                 // the rotation transformation must + this angle so 
                                 // the canvas to rotate the rocket properly

export default class Rocket {
    constructor(x, y, /** @type {RSGameEngine} */ gameObj) {
        this.width = 10;
        this.height = 40;
        this.color = '#f3a058';
        this.m_game = gameObj;

        this.pos = new Vector2D(x, y);
        this.vel = Vector2D.random2D();
        // this.vel = new Vector2D(100, -100);
        this.acc = new Vector2D();

        this.state = {
            velAngle: 0
        }
    }

    update(deltaTime) {
        this.vel.add(this.acc, deltaTime);
        this.pos.add(this.vel, deltaTime);
        this.acc.mult(0);
    }

    render() {
        this.rocketRotateAngle = this.vel.headingAngle("radian") + rocketAnglePlus;
        this.m_game.FillRectAndRotate(this.pos.x, this.pos.y, this.width, this.height, this.rocketRotateAngle, this.color);
    }
}