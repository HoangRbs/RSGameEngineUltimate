import RSGameEngine from '../RSGameEngine';

export default class TestGame extends RSGameEngine {
    constructor() {
        super();
    }

    OnCreate() {

        this.gameObjects = [

        ]
    }

    Update(deltaTime) {
        this.gameObjects.forEach(ob => ob.update(deltaTime));
    }

    Render() {
        this.gameObjects.forEach(ob => ob.render());
    }
}