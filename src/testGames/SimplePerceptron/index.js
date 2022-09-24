import RSGameEngine from '../../RSGameEngine';
import Perceptron from './Perceptron';
import { Point as KnownData } from './KnownData';
import InputHandler from './InputHandler';

export default class SimplePerceptron extends RSGameEngine {
  constructor() {
    super();
    this.m_gameObject = [];
    this.points = [];
  }

  importGameObjects() {
    let points = new Array(100);
    for (let i = 0; i < points.length; i++) {
      points[i] = new KnownData(this);
    }

    this.points = [...points];
    this.perceptron = new Perceptron();
    this.gameObjects = [...points];
  }

  OnCreate() {
    this.importGameObjects();
    /* test perceptron with inputs[] */
    /*
    let p = new Perceptron();
    let inputs = [-1, 0.5];
    console.log(p.guess(inputs));
    */

    // only guess and train when press enter key
    new InputHandler(() => {
      for (let i = 0; i < this.points.length; i++) {
        let inputs = [this.points[i].x, this.points[i].y];
        let desiredOutput = this.points[i].label;

        this.points[i].guessLabel = this.perceptron.guess(inputs);
        this.perceptron.train(inputs, desiredOutput);
      }
    });
  }

  Update(deltaTime) {
    // this.gameObjects.forEach((ob) => ob.update(deltaTime));
  }

  Render() {
    this.DrawLine(0, 0, this.m_canvasWidth, this.m_canvasHeight);
    this.gameObjects.forEach((ob) => ob.render());
  }
}
