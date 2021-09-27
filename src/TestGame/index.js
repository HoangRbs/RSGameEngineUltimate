import RSGameEngine from '../RSGameEngine';

import Paddle from './Paddle';
import Ball from './Ball';
import InputHandler from './InputHandler';

export default class TestGame extends RSGameEngine {
  constructor() {
    super();
    console.log('test git');
  }

  OnCreate() {
    this.paddle = new Paddle(this.m_canvasWidth, this.m_canvasHeight, this);
    new InputHandler(this.paddle);
    this.ball = new Ball(this);

    this.gameObjects = [this.paddle, this.ball];
  }

  Update(deltaTime) {
    this.gameObjects.forEach((ob) => ob.update(deltaTime));
  }

  Render() {
    this.gameObjects.forEach((ob) => ob.render());
  }
}
