import { genRndFloat } from '../../utils';

// the activation function
const sign = (sum) => {
  if (sum >= 0) return 1;
  return -1;
};

export default class Perceptron {
  constructor() {
    this.weights = new Array(2);

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
}
