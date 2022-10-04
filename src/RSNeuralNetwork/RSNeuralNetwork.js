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

  // guess
  feedForward(/** @type {Array} */ inputArray) {
    // ---------------- generating hidden layer results ------------ //

    // turn input into a matrix
    let inputMatrix = Matrix.fromArray(inputArray);

    // calculate weighted sum matrix in hidden layer
    let hiddenMatrix = Matrix.multiply(this.weights_ih, inputMatrix);
    hiddenMatrix.add(this.weights_bias_h);

    // activation function (step function)
    hiddenMatrix.map(signmoid);

    // --------------- generating output layer results...  --------- //
    // --------------- ...from the results of hidden layers -------- //

    let outputMatrix = Matrix.multiply(this.weights_ho, hiddenMatrix); // weighted sum in output layer
    outputMatrix.add(this.weights_bias_o);
    outputMatrix.map(signmoid); // activation function

    return outputMatrix.toArray();
  }

  train(inputArray, targetArray) {
    let guessArray = this.feedForward(inputArray);

    // calculate the Error: (error // cost function)
    // ERROR = TARGETS - OUTPUTS
    let targetMatrix = Matrix.fromArray(targetArray);
    let guessMatrix = Matrix.fromArray(guessArray);

    let errorMatrix = Matrix.substract(targetMatrix, guessMatrix);

    console.table(errorMatrix);
  }
}
