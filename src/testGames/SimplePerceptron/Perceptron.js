import { genRndFloat } from '../../utils';

export default class Perceptron {
  constructor(num) {
    this.weights = new Array(num); // number of weights, could be 2, could be 3
    this.learningRate = 0.09;

    // randomly init weights
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] = genRndFloat(-1, 1);
    }
  }

  // the activation function
  sign = (sum) => {
    if (sum >= 0) return 1; // label A
    return -1; // label B
  };

  // inputs [coordinate x, y] --> guess will immediately provide the Output y
  guess(/** @type {Array} */ inputs) {
    let sum = 0;
    for (let i = 0; i < this.weights.length; i++) {
      sum += inputs[i] * this.weights[i];
    }

    let output = this.sign(sum);
    return output;
  }

  // we train with the inputs [coordinate x, y] and the known label
  train(/** @type {Array} */ inputs, desiredOutput) {
    let guessOutput = this.guess(inputs);
    let error = desiredOutput - guessOutput; // 1 - (-1) or 1 - 1 or (-1) - 1 or (-1) - (-1)

    // tuning for new weights from error
    for (let i = 0; i < this.weights.length; i++) {
      // new weight = old weight + delta_Weight
      // delta weight is imagined almost like gradient descent
      // so learning rate get you to the target slowly and steady
      this.weights[i] += error * inputs[i] * this.learningRate;
    }
  }
}
