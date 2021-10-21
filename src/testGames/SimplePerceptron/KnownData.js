import RSGameEngine from '../../RSGameEngine';
import { genRndFloat } from '../../utils';

// a set of known datas as points that has been labeled

export class Point {
  constructor(/** @type {RSGameEngine} */ gameObj) {
    this.x = genRndFloat(0, 500);
    this.y = genRndFloat(0, 500);
    this.label;
    this.guessLabel = 0; // for visualize training process until it match with the target label
    this.gameObj = gameObj;

    // if x is below the y = x line then it's in label 'A' (known data attribute)
    if (this.x > this.y) this.label = 1;
    else this.label = -1;
  }

  render() {
    if (this.guessLabel === 1)
      this.gameObj.FillRect(this.x, this.y, 10, 10, 'blue');
    else this.gameObj.FillRect(this.x, this.y, 10, 10, 'red');
  }
}
