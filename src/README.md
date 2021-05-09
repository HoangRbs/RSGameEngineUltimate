## how to use game engine
create a folder "src/TestGame"

inside "src/TestGame/index.js"

{
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
}
## and then import it inside the outermost index.js file and run the game

"src/index.js"
{
    let testGame = new TestGame();
    testGame.BuildCanvas();
    testGame.Start();
}