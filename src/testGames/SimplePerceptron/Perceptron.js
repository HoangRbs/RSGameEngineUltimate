import { genRndFloat } from '../../utils';

// the activation function
const sign = (sum) => {
  if (sum >= 0) return 1;
  return -1;
};

export default class Perceptron {
  constructor() {
    this.weights = new Array(2);
    this.leaningRate = 0.1;

    // randomly init weights
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] = genRndFloat(-1, 1);
    }
  }

  guess(/** @type {Array} */ inputs) {
    let sum = 0;
    for (let i = 0; i < this.weights.length; i++) {
      sum += inputs[i] * this.weights[i];
    }

    let output = sign(sum);
    return output;
  }

  // we train with the inputs and the known answer
  train(/** @type {Array} */ inputs, desiredOutput) {
    let guessOutput = this.guess(inputs);
    let error = desiredOutput - guessOutput;

    // tuning weights from error
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] += error * inputs[i] * this.leaningRate;
    }
  }
}
