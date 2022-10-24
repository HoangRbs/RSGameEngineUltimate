import RSGameEngine from '../../RSGameEngine';

export default class Point {
  constructor(/** @type {RSGameEngine} */ gameObj, x, y) {
    this.x = x;
    this.y = y;
    this.gameObj = gameObj;
  }

  update() {}

  render() {
    this.gameObj.FillRect(this.x, this.y, 10, 10, 'red');
  }
}
