import RSGameEngine from '../RSGameEngine';
import Rocket from './Rocket';

export default class TestGame extends RSGameEngine {
    constructor() {
        super();
    }

    OnCreate() {
        this.testRocket = new Rocket(this.m_canvasWidth / 2, this.m_canvasHeight - 40, this);

        this.gameObjects = [
            this.testRocket
        ]
    }

    Update(deltaTime) {
        this.gameObjects.forEach(ob => ob.update(deltaTime));
    }

    Render() {
        this.gameObjects.forEach(ob => ob.render());
    }
}