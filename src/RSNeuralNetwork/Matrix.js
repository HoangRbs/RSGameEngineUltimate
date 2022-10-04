import { genRndFloat } from '../utils';

export default class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = [];

    // initialize 2d matrix
    for (let i = 0; i < this.rows; i++) {
      this.data[i] = [];
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = 0;
      }
    }
  }

  // randommize matrix values
  randommize(min, max) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = genRndFloat(min, max);
      }
    }
  }

  add(n) {
    // if n is a Matrix object that has the same size rows and columns - type of n
    if (n instanceof Matrix) {
      if (this.cols !== n.cols || this.rows !== n.rows) {
        // must has the same size
        console.log('matrixes must have the same size \n');
        return undefined;
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] += n.data[i][j];
        }
      }

      return this; // return this matrix as result for chain math operating
    }

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] += n;
      }
    }

    return this; // return this matrix as result for chain math operating
  }

  multiply(n) {
    // hadamard product
    if (n instanceof Matrix) {
      if (n.rows !== this.rows && n.cols !== this.cols) {
        console.log('cannot use hadamard product');
        return undefined;
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] *= n.data[i][j];
        }
      }

      return this;
    }

    // scalar product
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] *= n;
      }
    }

    return this; // return this matrix as result for chain math operating
  }

  static multiply(/** @type {Matrix} */ a, /** @type {Matrix} */ b) {
    // matrix, dot product
    if (a instanceof Matrix && b instanceof Matrix) {
      if (a.cols !== b.rows) {
        console.log('cols of A must equal rows of B \n');
        return undefined;
      }

      let result = new Matrix(a.rows, b.cols);

      for (let i = 0; i < result.rows; i++) {
        for (let j = 0; j < result.cols; j++) {
          let sum = 0;
          for (let k = 0; k < a.cols; k++) {
            sum += a.data[i][k] * b.data[k][j];
          }

          result.data[i][j] = sum;
        }
      }

      return result;
    }
  }

  static substract(a, b) {
    // return a new matrix a - b

    if (a instanceof Matrix && b instanceof Matrix) {
      if (a.cols !== b.cols && a.rows !== b.rows) {
        console.log('not the same size \n');
        return undefined;
      }

      let result = new Matrix(a.rows, a.cols);

      for (let i = 0; i < result.rows; i++) {
        for (let j = 0; j < result.cols; j++) {
          result.data[i][j] = a.data[i][j] - b.data[i][j];
        }
      }

      return result;
    }

    return undefined;
  }

  transpose() {
    let result = new Matrix(this.cols, this.rows);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        result.data[j][i] = this.data[i][j];
      }
    }

    return result;
  }

  map(func) {
    // apply function to every element of the matrix
    // so later we can apply activation function to any element of the hidden weighted sum matrix
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let val = this.data[i][j];
        this.data[i][j] = func(val);
      }
    }

    return this;
  }

  static map(matrix, func) {
    let result = new Matrix(matrix.rows, matrix.cols);

    // apply function to every element of the matrix
    // so later we can apply activation function to any element of the hidden weighted sum matrix
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.cols; j++) {
        let val = matrix.data[i][j];
        result.data[i][j] = func(val);
      }
    }

    return result;
  }

  // convert an array into a matrix
  static fromArray(/** @type {Array} */ arr) {
    let m = new Matrix(arr.length, 1);
    for (let i = 0; i < arr.length; i++) {
      m.data[i][0] = arr[i];
    }

    return m;
  }

  toArray() {
    let arr = [];
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        arr.push(this.data[i][j]);
      }
    }

    return arr;
  }

  printMatrix() {
    console.table(this.data);
  }
}
