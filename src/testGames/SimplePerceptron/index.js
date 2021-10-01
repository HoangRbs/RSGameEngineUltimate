import RSGameEngine from '../../RSGameEngine';

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
  }

  Update(deltaTime) {
    // this.gameObjects.forEach((ob) => ob.update(deltaTime));
  }

  Render() {
    // this.gameObjects.forEach((ob) => ob.render());
  }
}
