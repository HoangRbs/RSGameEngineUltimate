import RSGameEngine from '../../RSGameEngine';
import RSNeuralNetwork from '../../RSNeuralNetwork/RSNeuralNetwork';
import Matrix from '../../RSNeuralNetwork/Matrix';

export default class testRSNeuralNetwork extends RSGameEngine {
  constructor() {
    super();
    this.m_gameObject = [];
  }

  importGameObjects() {
    this.brain = new RSNeuralNetwork(3, 4, 2);
    this.gameObjects = []; // for updating and rendering all kind of objects

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
  }

  OnCreate() {
    this.importGameObjects();

    let nn = new RSNeuralNetwork(2, 2, 1); // 2 input, 2 hidden nodes, 1 output

    let inputs = [1, 0];
    let output = nn.feedForward(inputs);
    console.log(output);
  }

  Update(deltaTime) {
    // this.gameObjects.forEach((ob) => ob.update(deltaTime));
  }

  Render() {
    // this.gameObjects.forEach((ob) => ob.render());
  }
}
