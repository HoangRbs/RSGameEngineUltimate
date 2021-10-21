import RSGameEngine from '../../RSGameEngine';
import Perceptron from './Perceptron';
import { Point } from './KnownData';

export default class SimplePerceptron extends RSGameEngine {
  constructor() {
    super();
    this.m_gameObject = [];
  }

    importGameObjects() { 
        let points = new Array(100);
        for (let i = 0; i < points.length; i++) {
            points[i] = new Point(this);
        }   

        this.gameObjects = [
            ...points
      ];
    }

  OnCreate() {
    this.importGameObjects();

    let p = new Perceptron();
    let inputs = [-1, 0.5];
    // console.log(p.guess(inputs));
  }

  Update(deltaTime) {
    // this.gameObjects.forEach((ob) => ob.update(deltaTime));
  }

  Render() {
    this.DrawLine(0, 0, this.m_canvasWidth, this.m_canvasHeight);
    this.gameObjects.forEach((ob) => ob.render());
  }
}
