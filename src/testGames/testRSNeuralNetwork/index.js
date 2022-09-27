import RSGameEngine from '../../RSGameEngine';
import RSNeuralNetwork from '../../RSNeuralNetwork/RSNeuralNetwork';

export default class testRSNeuralNetwork extends RSGameEngine {
  constructor() {
    super();
    this.m_gameObject = [];
  }

  importGameObjects() {
    this.brain = new RSNeuralNetwork(3, 4, 2);
    this.gameObjects = []; // for updating and rendering all kind of objects
  }

  OnCreate() {
    this.importGameObjects();
  }

  Update(deltaTime) {
    // this.gameObjects.forEach((ob) => ob.update(deltaTime));
  }

  Render() {
    // this.gameObjects.forEach((ob) => ob.render());
  }
}
