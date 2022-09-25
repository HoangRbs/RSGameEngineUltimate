import RSGameEngine from '../../RSGameEngine';
import Perceptron from './Perceptron';
import Point from './Point';
import InputHandler from './InputHandler';
import F from './LinearFunction';

export default class SimplePerceptron extends RSGameEngine {
  constructor() {
    super();
    this.m_gameObject = [];
    this.points = [];
  }

  importGameObjects() {
    let points = new Array(100);
    for (let i = 0; i < points.length; i++) {
      points[i] = new Point(this);
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
        let inputs = [this.points[i].x, this.points[i].y]; // coordinates of a point
        this.points[i].guessLabel = this.perceptron.guess(inputs);
        // guessLabel is the unknown label that is trying to be trained to archive the known target "label"
        // we'll display guess label color on the canvas, and see it change whenever we press enter to train.

        // training guess label to be like label (desired output)
        let desiredOutput = this.points[i].label; // known data
        this.perceptron.train(inputs, desiredOutput);
      }
    });
  }

  Update(deltaTime) {
    // this.gameObjects.forEach((ob) => ob.update(deltaTime));
  }

  Render() {
    let x1 = 25;
    let y1 = F(x1);
    let x2 = this.m_canvasWidth - 20;
    let y2 = F(x2);

    this.DrawLine(x1, y1, x2, y2);
    this.gameObjects.forEach((ob) => ob.render());
  }
}
