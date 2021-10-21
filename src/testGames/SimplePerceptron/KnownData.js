import RSGameEngine from '../../RSGameEngine';
import { genRndFloat } from '../../utils';

// a set of known datas as points that has been labeled 

export class Point {
  constructor(/** @type {RSGameEngine} */ gameObj) {
    this.x = genRndFloat(0, 500);
    this.y = genRndFloat(0, 500);
    this.label;
    this.gameObj = gameObj;

    // if x is below the y = x line then it's in label 'A' (known data attribute)
    if (this.x > this.y) this.label = 'A';
    else this.label = 'B';
  }

  render() {
    if (this.label === 'A') this.gameObj.FillRect(this.x, this.y, 5, 5, 'blue');
    else this.gameObj.FillRect(this.x, this.y, 5, 5, 'red');
  }
}
