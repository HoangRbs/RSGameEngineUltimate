import RSGameEngine from '../../RSGameEngine';
import Perceptron from './Perceptron';

export default class SimplePerceptron extends RSGameEngine {
  constructor() {
    super();
    this.m_gameObject = [];
  }

  //   importGameObjects() {
  //     this.gameObjects = [
  //       ...this.m_pop.getRockets(),
  //       this.target,
  //       ...this.obstacleObjects,
  //     ];
  //   }

  OnCreate() {
    // this.importGameObjects();

    let p = new Perceptron();
    let inputs = [-1, 0.5];
    console.log(p.guess(inputs));
  }

  Update(deltaTime) {
    // this.gameObjects.forEach((ob) => ob.update(deltaTime));
  }

  Render() {
    // this.gameObjects.forEach((ob) => ob.render());
  }
}
