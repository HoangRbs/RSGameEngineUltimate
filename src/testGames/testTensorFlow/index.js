import RSGameEngine from '../../RSGameEngine';
import * as tf from '@tensorflow/tfjs';

export default class testTensorFlow extends RSGameEngine {
  constructor() {
    super();
  }

  OnCreate() {
    tf.tensor([1, 2, 3, 4]).print();

    this.gameObjects = [];
  }

  Update(deltaTime) {
    // this.gameObjects.forEach((ob) => ob.update(deltaTime));
  }

  Render() {
    // this.gameObjects.forEach((ob) => ob.render());
  }
}
