import RSGameEngine from '../../RSGameEngine';
import RSNeuralNetwork from '../../RSNeuralNetwork/RSNeuralNetwork';
import Matrix from '../../RSNeuralNetwork/Matrix';
import { trainingDatas } from './trainingDatas';

export default class testRSNeuralNetwork extends RSGameEngine {
  constructor() {
    super();
    this.m_gameObject = [];
  }

  importGameObjects() {
    this.brain = new RSNeuralNetwork(3, 4, 2);
    this.gameObjects = []; // for updating and rendering all kind of objects

    // ------------- test matrix -----------------------------
    // test add
    // let m1 = new Matrix(3, 2);
    // let m2 = new Matrix(3, 2);

    // m1.randommize(); m1.printMatrix();
    // m2.randommize(); m2.printMatrix();

    // m1.add(m2);
    // m1.printMatrix();

    // test multiply
    // let m1 = new Matrix(3, 2);
    // let m2 = new Matrix(2, 2);

    // m1.randommize(); m1.printMatrix();
    // m2.randommize(); m2.printMatrix();

    // m1.multiply(2); m1.printMatrix();
    // Matrix.multiply(m1, m2).printMatrix();

    // test transpose
    // let m1 = new Matrix(3, 2);
    // m1.randommize(); m1.printMatrix();
    // m1.transpose().printMatrix();

    //test map
    // let m1 = new Matrix(3,2);
    // m1.randommize(); m1.printMatrix();
    // m1.map((x) => { return x * 2 });
    // m1.printMatrix();

    // ------------------------
  }

  OnCreate() {
    this.importGameObjects();
    // ------------- test neural network -------------------

    // 2 input, 2 hidden nodes, 1 outputs
    // the target array length size must matchs with the outputs array length
    let nn = new RSNeuralNetwork(2, 2, 1);

    // train for 50000 times
    for (let i = 0; i < 50000; i++) {
      for (let data of trainingDatas) {
        nn.train(data.inputs, data.targets);
      }
    }

    // test neural network after trained
    console.log(nn.feedForward([1, 0])); // should be ~~ 1
    console.log(nn.feedForward([0, 1]));
    console.log(nn.feedForward([0, 0])); // should be ~~ 0
    console.log(nn.feedForward([1, 1]));
  }

  Update(deltaTime) {
    // this.gameObjects.forEach((ob) => ob.update(deltaTime));
  }

  Render() {
    // this.gameObjects.forEach((ob) => ob.render());
  }
}
