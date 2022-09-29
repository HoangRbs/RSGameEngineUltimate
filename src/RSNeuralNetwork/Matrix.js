export default class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.matrix = [];

    // initialize 2d matrix
    for (let i = 0; i < this.rows; i++) {
      this.matrix[i] = [];
      for (let j = 0; j < this.cols; j++) {
        this.matrix[i][j] = 0;
      }
    }
  }

  // randommize matrix values
  randommize() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.matrix[i][j] = Math.floor(Math.random() * 10); // integer
      }
    }
  }

  add(n) {
    let result = new Matrix(this.rows, this.cols);

    // if n is a Matrix object that has the same size rows and columns - type of n
    if (n instanceof Matrix) {
      if (n.cols !== this.cols || n.rows !== this.rows) {
        // must has the same size
        console.log('matrixes must have the same size \n');
        return undefined;
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          result.matrix[i][j] = this.matrix[i][j] + n.matrix[i][j];
        }
      }

      return result;
    }

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        result.matrix[i][j] = this.matrix[i][j] + n;
      }
    }

    return result;
  }

  multiply(n) {
    // if n is a Matrix object - type of n
    if (n instanceof Matrix) {
      if (this.cols !== n.rows) {
        console.log('cols of A must equal rows of B \n');
        return undefined;
      }

      // matrix, dot product calculation
      let a = this;
      let b = n;
      let result = new Matrix(a.rows, b.cols);

      for (let i = 0; i < result.rows; i++) {
        for (let j = 0; j < result.cols; j++) {
          let sum = 0;
          for (let k = 0; k < a.cols; k++) {
            sum += a.matrix[i][k] * b.matrix[k][j];
          }

          result.matrix[i][j] = sum;
        }
      }

      return result;
    }

    let result = new Matrix(this.rows, this.cols);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        result.matrix[i][j] = this.matrix[i][j] * n;
      }
    }

    return result;
  }

  transpose() {
    let result = new Matrix(this.cols, this.rows);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        result.matrix[j][i] = this.matrix[i][j];
      }
    }

    return result;
  }
}
