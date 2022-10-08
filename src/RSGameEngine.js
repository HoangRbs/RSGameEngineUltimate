// how to use game engine
/*
create a folder "src/testGames/TestGame"
inside "src/testGames/TestGame/index.js"

import RSGameEngine from '../../RSGameEngine';

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

and then import it inside the outermost index.js file src/index.js then run the game

let testGame = new TestGame();
testGame.BuildCanvas();
testGame.Start();

*/

const CANVAS_WIDTH = 650;
const CANVAS_HEIGHT = 500;

export default class RSGameEngine {
  constructor() {
    // default width, height
    this.m_canvasWidth = CANVAS_WIDTH;
    this.m_canvasHeight = CANVAS_HEIGHT;

    this.m_canvas;
    this.m_ctx;

    this.currentTime = 0;
    this.lastTime = 0;
    this.deltaTime = 0;

    this.FPS = 70; // limit system frame per sec = 60, 70, ....
    this.renderTimePerFrame = 1 / this.FPS; // number of seconds in a frame
    this.frameCounter = 0; // real system fps performance

    this.elapsedTime = 0; // to show fps when it reaches 1 second
    this.renderElapsedTime = 0; // to render only when it reaches amount of time per frame
  }

  BuildCanvas(canvasWidth, canvasHeight) {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');

    this.m_canvas = canvas;

    /** @type {CanvasRenderingContext2D} */
    this.m_ctx = ctx;

    this.m_canvas.id = 'gameCanvas';
    this.m_canvas.width = canvasWidth || CANVAS_WIDTH;
    this.m_canvas.height = canvasHeight || CANVAS_HEIGHT;

    // for performance ------------
    this.m_canvasWidth = canvasWidth;
    this.m_canvasHeight = canvasHeight;
    // ----------------------------

    this.m_canvas.style.border = '1px solid black';
    document.body.prepend(this.m_canvas);
  }

  // because GameLoop is a callback function , use it as arrow function so the "this" keyword
  // refers to the nearest object which is the RSGameEngine class
  // or if not use arrow function , just use bind() function in the Start function

  GameLoop2() {
    this.currentTime = performance.now();
    this.deltaTime = (this.currentTime - this.lastTime) / 1000; // second
    this.lastTime = this.currentTime;

    this.elapsedTime += this.deltaTime; // to show real fps
    this.renderElapsedTime += this.deltaTime; // to render only when it reaches amount of time per frame

    // the incease in value like position or velocity must multiply DELTA TIME
    // the purpose of delta time is used in more powerful machine and weaker machine
    // but the movement of vel/pos still perform the same
    this.Update(this.deltaTime);

    if (this.renderElapsedTime >= this.renderTimePerFrame) {
      this.m_ctx.clearRect(0, 0, this.m_canvasWidth, this.m_canvasHeight);
      this.Render();

      this.renderElapsedTime = 0;
    }

    if (this.elapsedTime >= 1) {
      // display fps every second
      // console.log('FPS: ', this.frameCounter);
      this.frameCounter = 0;
      this.elapsedTime = 0;
    }

    this.frameCounter++;
  }

  Start() {
    // call game resource initialization that inherits this class
    this.OnCreate();

    // reset system timer to prevent delta time too high
    this.resetSystemTimer();

    // start the game loop
    // window.requestAnimationFrame(this.GameLoop.bind(this));
    setInterval(this.GameLoop2.bind(this), 15);
  }

  // other games inherit the RSGameEngine class
  // must override these functions or else these functions throw errors ---------------------
  Update(deltaTime) {
    throw new Error('You have to implement the method Update(deltaTime)!');
  }

  Render() {
    throw new Error('You have to implement the method Render()!');
  }

  // game create object and resouces
  OnCreate() {
    throw new Error('You have to implement the method onCreate()!');
  }

  resetSystemTimer() {
    this.currentTime = 0;
    // try this.lastTime == 0 then the next frame
    // the deltatime = performance.now() - this.lastTime will be far too high\
    // -> make objects go into "space" :P
    this.lastTime = performance.now();
    this.deltaTime = 0;
    this.elapsedTime = 0;
    this.renderElapsedTime = 0;
    this.frameCounter = 0;
  }

  // canvas, image pixels manipulation, drawing , ..... ---------------------------------------

  DrawLine(x1, y1, x2, y2) {
    this.m_ctx.moveTo(x1, y1);
    this.m_ctx.lineTo(x2, y2);
    this.m_ctx.stroke();
  }

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

  PutImageData(imageData, x, y) {
    imageData !== null ? this.m_ctx.putImageData(imageData, x, y) : {};
  }
}
