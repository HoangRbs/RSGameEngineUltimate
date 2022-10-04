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

    // input, hidden, output matrixes values
    this.inputMatrix = new Matrix(this.input_nodes, 1);
    this.hiddenMatrix = new Matrix(this.hidden_nodes, 1);
    this.outputMatrix = new Matrix(this.output_nodes, 1);

    this.learningRate = 0.1;
  }

  // guess
  feedForward(/** @type {Array} */ inputArray) {
    // turn input into a matrix
    this.inputMatrix = Matrix.fromArray(inputArray);

    // ---------------- generating hidden layer results ------------ //

    // calculate weighted sum matrix in hidden layer
    this.hiddenMatrix = Matrix.multiply(this.weights_ih, this.inputMatrix);
    this.hiddenMatrix.add(this.weights_bias_h);
    // activation function (step function)
    this.hiddenMatrix.map(signmoid);

    // --------------- generating output layer results...  --------- //
    // --------------- ...from the results of hidden layers -------- //

    // weighted sum in output layer
    this.outputMatrix = Matrix.multiply(this.weights_ho, this.hiddenMatrix);
    this.outputMatrix.add(this.weights_bias_o);
    // activation function
    this.outputMatrix.map(signmoid);

    return this.outputMatrix.toArray();
  }

  train(inputArray, targetArray) {
    this.feedForward(inputArray); // guessing --> will change the input, hidden and output matrixes
    let targetMatrix = Matrix.fromArray(targetArray);

    // --------------- back prop: output -> hidden --------------------------
    // 1. difference between actual value and prediction OUTPUT_ERROR = TARGETS - OUTPUTS
    let outputErrorsMatrix = Matrix.substract(targetMatrix, this.outputMatrix);

    // 2. gradients = learningRate * Error * (O * (1 - O)) -- dsigmoid
    let gradients = Matrix.map(this.outputMatrix, (x) => {
      return x * (1 - x);
    });

    gradients.multiply(outputErrorsMatrix); // hadamard product
    gradients.multiply(this.learningRate);

    // 3. calculate delta weights = gradient * H_T --> weights += deltaWeight to change the weights
    let weights_ho_deltas = Matrix.multiply(
      // dot product
      gradients,
      this.hiddenMatrix.transpose()
    );
    this.weights_ho.add(weights_ho_deltas);

    // 4. weights bias at output layer (no need the hidden since bias' hidden always == 1)
    this.weights_bias_o.add(gradients);

    // ---------------- back prop: input -> hidden ---------------------------
    // 1. error function at hidden HIDDEN_ERROR = weights_ho_t * outputErrors;
    let hiddenErrorsMatrix = Matrix.multiply(
      // dot product
      this.weights_ho.transpose(),
      outputErrorsMatrix
    );

    // 2. gradient = learningRate * H_Error * (H * (1 - H)) -- dsigmoid
    gradients = Matrix.map(this.hiddenMatrix, (x) => {
      return x * (1 - x);
    });
    gradients.multiply(hiddenErrorsMatrix); // hadamard product
    gradients.multiply(this.learningRate);

    // 3. calculate delta weights = gradient * I_T --> weights += deltaWeight to change the weights
    let weights_ih_deltas = Matrix.multiply(
      // dot product
      gradients,
      this.inputMatrix.transpose()
    );
    this.weights_ih.add(weights_ih_deltas);

    // 4. weights bias at hidden layer (no need the hidden since bias' hidden always == 1)
    this.weights_bias_h.add(gradients);
  }
}
