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

    // m1.randommize();
    // m2.randommize();

    // console.table(m1.matrix);
    // console.table(m2.matrix);

    // console.table(m1.add(2).matrix);

    // test multiply
    // let m1 = new Matrix(3, 2);
    // let m2 = new Matrix(2, 4);

    // m1.randommize();
    // m2.randommize();

    // console.table(m1.matrix);
    // console.table(m2.matrix);

    // console.table(m1.multiply(m2).matrix);

    // test transpose
    let m1 = new Matrix(3, 2);
    m1.randommize();
    console.table(m1.matrix);
    console.table(m1.transpose().matrix);
  }

  OnCreate() {
    this.importGameObjects();

    //m1.multiply(2);
    // console.table("m1", m1.matrix);

    //m1.add(m2);
    // console.table("m1", m1.matrix);
  }

  Update(deltaTime) {
    // this.gameObjects.forEach((ob) => ob.update(deltaTime));
  }

  Render() {
    // this.gameObjects.forEach((ob) => ob.render());
  }
}
