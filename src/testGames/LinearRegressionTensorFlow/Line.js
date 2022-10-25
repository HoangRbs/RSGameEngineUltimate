// Linear function -- function and render the line
// y = mx + b
// m is slope, just like weights in neural network
// b is like bias
import { genRndFloat } from '../../utils';
import * as tf from '@tensorflow/tfjs';
import Point from './Point';
import RSGameEngine from '../../RSGameEngine';
import { scaleNumberInRange } from '../../utils';

export default class Line {
  constructor(/** @type {RSGameEngine} */ gameObj) {
    // we create a random line at the beginning
    this.m = genRndFloat(0, 1);
    this.b = genRndFloat(0, 1);

    // we need to change m and b so they need to be tensor variables.
    this.m_tf = tf.scalar(this.m).variable(); // we don't want to tidy these since these need improving overtime
    this.b_tf = tf.scalar(this.b).variable();

    this.learningRate = 0.1;
    // optimizer of the loss function: using stochastic gradient descent
    this.optimizer = tf.train.sgd(this.learningRate);

    this.input_xs = []; // multiple inputs x of input points
    this.input_ys = []; // multiple inputs y of input points --> known datas // target // labels

    this.tenseInput_Xs; // multiple inputs x but type: tensor
    this.tenseInput_Ys;

    this.gameObj = gameObj;
  }

  // function of the line F(x)
  // y = m * x + b
  // X_s because there are multiple inputs,
  // type: tensor
  // also called: PREDICT
  F(x_s) {
    const y_s = x_s.mul(this.m_tf).add(this.b_tf);
    // console.log('test y_s:', y_s.dataSync());

    return y_s;
  }

  // loss function, cost function, errorFunction --> use "mean square error"
  lossFunction(pred, label) {
    // pred: predictions are the guess values - type: tensor
    // label: known data labels - type: tensor

    // error = predictions - labels
    // 1/n * (pred - label) ^ 2

    return pred.sub(label).square().mean();
  }

  // training the Line :)
  train() {
    // minimize this loss function (cost function, error function)...
    tf.tidy(() => {
      if (this.input_xs.length > 0) {
        this.optimizer.minimize(() => {
          return this.lossFunction(
            this.F(this.tenseInput_Xs),
            this.tenseInput_Ys
          );
        });
      }
    });

    // since inside F(x) function already contains m and b,
    // so this will optimize those 2 values
    // note that m and b must be mutable variables.
    // read more at tensor flow js api: minimize()
  }

  // get input datas, mostly points
  getPoints(/** @type {Point[]} */ points) {
    // destroy the previous tensors for new ones
    // this.tenseInput_Xs.dispose();
    // this.tenseInput_Ys.dispose();

    for (let i = 0; i < points.length; i++) {
      // MUST normalize the input datas between [0, 1]
      this.input_xs.push(
        scaleNumberInRange(points[i].x, 0, this.gameObj.m_canvasWidth, 0, 1)
      );
      this.input_ys.push(
        scaleNumberInRange(points[i].y, 0, this.gameObj.m_canvasHeight, 0, 1)
      );
    }

    this.tenseInput_Xs = tf.tensor1d(this.input_xs);
    this.tenseInput_Ys = tf.tensor1d(this.input_ys);
  }

  // train in update function
  update() {
    this.train();
    // test memory leak
    console.log('memory: ', tf.memory().numTensors);
  }

  // draw line
  render() {
    tf.tidy(() => {
      const x_s_test = [0, 1]; // from start of canvas to end of canvas
      const y_s_test_tense = this.F(tf.tensor1d(x_s_test));
      const y_s_test = y_s_test_tense.dataSync();

      // map to real canvas scale
      // there's nothing wrong with the function throw errors, because at first
      // the line might draw outside of the canvas because the right function ...
      // .. is not properly adjusted.

      // and the right input points have to be properly placed ..
      // .. or else when the line going verticle, because the datas are almost in verticle
      // the line will disapear, bad input datas == bad results
      let x1 = scaleNumberInRange(
        x_s_test[0],
        0,
        1,
        0,
        this.gameObj.m_canvasWidth
      );
      let y1 = scaleNumberInRange(
        y_s_test[0],
        0,
        1,
        0,
        this.gameObj.m_canvasHeight
      );

      let x2 = scaleNumberInRange(
        x_s_test[1],
        0,
        1,
        0,
        this.gameObj.m_canvasWidth
      );
      let y2 = scaleNumberInRange(
        y_s_test[1],
        0,
        1,
        0,
        this.gameObj.m_canvasHeight
      );

      this.gameObj.DrawLine(x1, y1, x2, y2);
    });
  }
}
