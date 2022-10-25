import * as tf from '@tensorflow/tfjs';
import RSGameEngine from '../../RSGameEngine';

export default class XOR_tensowflow extends RSGameEngine {
  constructor() {
    super();

    // -- model ------
    this.trainingDatas; // input datas to train the model
    this.model;
    this.sgdOpt;
    this.isTraining = false; // since train is a async function, we don't want to do it parallel in the update loop

    // -- canvas -----
    this.resolution;
    this.rows;
    this.cols;
    this.block_width;
    this.block_height;

    // -- input datas to predict
    this.canvas_inputDatas;
    this.canvas_inputDatas_tense; // type: tensor
  }

  OnCreate() {
    this.gameObjects = [];

    // inputs and outputs for XOR problem
    this.trainingDatas = {
      inputs: tf.tensor2d([
        [0, 0], // 4 inputs
        [0, 1],
        [1, 0],
        [1, 1],
      ]),
      labels: tf.tensor2d([
        [0], // 4 labels correspoding to 4 inputs
        [1],
        [1],
        [0],
      ]),
    };

    // create a model
    this.model = tf.sequential();

    // hidden layer: must have input shape defined
    // inputShapes are inputs prior to hidden layer
    const hidden = tf.layers.dense({
      units: 2, // 2 nodes
      inputShape: [2],
      activation: 'sigmoid',
    });

    // output layer
    const output = tf.layers.dense({
      units: 1, // 1 nodes
      activation: 'sigmoid',
    });

    this.model.add(hidden);
    this.model.add(output);

    // an optimizer using gradient descent
    this.sgdOpt = tf.train.sgd(0.5);

    // done configuring the model, so compile it.
    this.model.compile({
      optimizer: this.sgdOpt,
      loss: tf.losses.meanSquaredError, // minimize the loss function
    });

    // prepare the canvas rows, cols for xor problems
    this.resolution = 40;
    this.cols = this.m_canvasWidth / this.resolution;
    this.rows = this.m_canvasHeight / this.resolution;

    this.block_width = this.m_canvasWidth / this.cols;
    this.block_height = this.m_canvasHeight / this.rows;

    // create input datas
    this.canvas_inputDatas = [];
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        // each block has input of [0 ,0] ... [0, 1]
        // normalize between 0 and 1
        let x1 = i / (this.cols - 1);
        let x2 = j / (this.rows - 1);

        this.canvas_inputDatas.push([x1, x2]);
      }
    }

    // change to tensor type
    this.canvas_inputDatas_tense = tf.tensor2d(this.canvas_inputDatas);
  }

  // training the model
  async train() {
    this.isTraining = true;

    return await this.model.fit(
      this.trainingDatas.inputs,
      this.trainingDatas.labels,
      {
        shuffle: true, // shuffle the training datas
      }
    );
  }

  Update(deltaTime) {
    // this.gameObjects.forEach((ob) => ob.update(deltaTime));
    if (!this.isTraining) {
      tf.tidy(() => {
        this.train().then((res) => {
          // complete training!

          // the loss must be decreased overtime
          // console.log(res.history.loss[0]);
          this.isTraining = false;
        });
      });
    }
  }

  Render() {
    let ys = this.model.predict(this.canvas_inputDatas_tense).dataSync();

    // this.gameObjects.forEach((ob) => ob.render());
    let index = 0;
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        let color = `rgb(${ys[index] * 255}, ${ys[index] * 255}, ${
          ys[index] * 255
        })`;
        this.FillRect(
          j * this.resolution,
          i * this.resolution,
          this.resolution,
          this.resolution,
          color
        );
        this.DrawText(
          `${ys[index].toFixed(2)}`,
          15,
          j * this.resolution + this.block_width / 2 - 15,
          i * this.resolution + this.block_height / 2
        );
        index++;
      }
    }
  }
}
