import Matrix from './Matrix';

// activation function
function signmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

export default class RSNeuralNetwork {
  constructor(numI, numH, numO) {
    this.input_nodes = numI;
    this.hidden_nodes = numH;
    this.output_nodes = numO;

    // weights between input and hidden layer
    this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
    this.weights_ih.randommize(-1, 1);

    // weights between hidden and output layer
    this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
    this.weights_ho.randommize(-1, 1);

    // weights bias hidden
    this.weights_bias_h = new Matrix(this.hidden_nodes, 1);
    this.weights_bias_h.randommize(-1, 1);

    // weights bias output
    this.weights_bias_o = new Matrix(this.output_nodes, 1);
    this.weights_bias_o.randommize(-1, 1);
  }

  feedForward(/** @type {Array} */ inputArray) {
    // ---------------- generating hidden outputs --------------------------

    // turn input into a matrix
    let inputs = Matrix.fromArray(inputArray);

    // calculate weighted sum matrix
    let hiddenOutputs = Matrix.multiply(this.weights_ih, inputs);
    hiddenOutputs.add(this.weights_bias_h);

    // activation function (step function)
    hiddenOutputs.map(signmoid);

    // --------------- generating outputs layer from results of hidden layers ------------------

    let outputs = Matrix.multiply(this.weights_ho, hiddenOutputs); // weighted sum in output layer
    outputs.add(this.weights_bias_o);
    outputs.map(signmoid); // activation function

    return outputs.toArray();
  }
}
