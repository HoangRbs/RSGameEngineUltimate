import RSGameEngine from '../../RSGameEngine';
import { genRndFloat } from '../../utils';
import F from './LinearFunction';

// a set of known datas as points that has been labeled

export default class Point {
  constructor(/** @type {RSGameEngine} */ gameObj) {
    this.x = genRndFloat(0, 500);
    this.y = genRndFloat(0, 500);
    this.bias = 1;
    this.label = 0; // Known data
    this.guessLabel = 0; // for visualize training process until it match with the target label above
    this.gameObj = gameObj;

    // if the point is below F(x) line then it's in label 'A' (known data)
    if (this.y < F(this.x)) this.label = 1;
    // label A
    else this.label = -1; // label B
  }

  render() {
    if (this.guessLabel === 1)
      this.gameObj.FillRect(this.x, this.y, 10, 10, 'blue');
    else this.gameObj.FillRect(this.x, this.y, 10, 10, 'red');
  }
}
