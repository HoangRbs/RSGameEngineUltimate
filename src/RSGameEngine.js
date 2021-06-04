// how to use game engine
/*
create a folder "TestGame"
inside "TestGame/index.js"

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

and then import it inside the outermost index.js file and run the game

let testGame = new TestGame();
testGame.BuildCanvas();
testGame.Start();

*/

const CANVAS_WIDTH = 650;
const CANVAS_HEIGHT = 500;

export default class RSGameEngine {
    constructor() {
        this.canvasWidth = CANVAS_WIDTH;
        this.canvasHeight = CANVAS_HEIGHT;
        this.lastTime = 0;
        this.deltaTime = 0;
    }

    BuildCanvas(canvasWidth, canvasHeight) {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext("2d");

        this.m_canvas = canvas;

        /** @type {CanvasRenderingContext2D} */
        this.m_ctx = ctx;

        this.m_canvas.id = "gameCanvas";
        this.m_canvas.width = canvasWidth || CANVAS_WIDTH;
        this.m_canvas.height = canvasHeight || CANVAS_HEIGHT;

        // for performance ------------
        this.m_canvasWidth = canvasWidth;
        this.m_canvasHeight = canvasHeight;
        // ----------------------------

        this.m_canvas.style.border = "1px solid black";


        document.body.prepend(this.m_canvas);
    }

    // because GameLoop is a callback function , use it as arrow function so the "this" keyword
    // refers to the nearest object which is the RSGameEngine class
    // or use bind() function in the Start function
    GameLoop(timestamp) {

        this.deltaTime = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        this.m_ctx.clearRect(0, 0, this.m_canvasWidth, this.m_canvasHeight);

        // the incease in value like position or velocity must multiply DELTA TIME
        // the purpose of delta time is used in more powerful machine and weaker machine 
        // but the movement of vel/pos still perform the same
        this.Update(this.deltaTime);
        this.Render();

        requestAnimationFrame(this.GameLoop.bind(this));
    }

    Start() {
        this.OnCreate();

        // start the game loop
        window.requestAnimationFrame(this.GameLoop.bind(this));
    }

    // other games inherit the RSGameEngine class
    // must override these functions or else these functions throw errors ---------------------
    Update(deltaTime) {
        throw new Error('You have to implement the method Update(deltaTime)!');
    };

    Render() {
        throw new Error('You have to implement the method Render()!');
    };

    // game create object and resouces
    OnCreate() {
        throw new Error('You have to implement the method onCreate()!');
    }
    // -----------------------------------------------------------------------------------------

    DrawImage(imgEl, x, y, w, h) {
        this.m_ctx.drawImage(imgEl, x, y, w, h);
    }

    FillRect(x, y, w, h, color = '#00f') {
        this.m_ctx.fillStyle = color;
        this.m_ctx.fillRect(x, y, w, h);
    }

    // angle must be radian
    // x, y, w, h: position, size of the rect
    // angle (radian): the angle of the rect where it's heading to (velocity vector angle)
    FillRectAndRotate(x, y, w, h, angle, color = '#00f') {
        let center_x = x + w / 2;
        let center_y = y + h / 2;

        // Matrix transformation
        this.m_ctx.translate(center_x, center_y);
        this.m_ctx.rotate(angle);

        // render 
        this.m_ctx.fillStyle = color;
        this.m_ctx.fillRect(-w / 2, -h / 2, w, h); // 0 - w/2, 0 - h/2

        // reset angle after drawing rect for the next drawing turn
        this.m_ctx.rotate(-angle);

        // reset translate for the next drawing turn
        this.m_ctx.translate(-center_x, -center_y);
    }
}