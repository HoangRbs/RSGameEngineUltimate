import RSGameEngine from '../../RSGameEngine';
import Point from './Point';
import Line from './Line';

export default class testTensorFlow extends RSGameEngine {
  constructor() {
    super();
  }

  OnCreate() {
    this.gameObjects = [];
    this.points = [];
    this.line;

    // add points to canvas
    this.m_canvas.addEventListener(
      'mousedown',
      (e) => {
        // get current point
        let currX = e.clientX - this.m_canvas.offsetLeft;
        let currY = e.clientY - this.m_canvas.offsetTop;

        let point = new Point(this, currX, currY);
        this.points.push(point);

        // every new data added in, create new line
        this.line = new Line(this);
        this.line.getPoints(this.points);

        // game objects to render points
        this.gameObjects.push(point);
      },
      false
    );
  }

  Update(deltaTime) {
    // this.gameObjects.forEach((ob) => ob.update(deltaTime));
    this.line ? this.line.update() : '';
  }

  Render() {
    this.gameObjects.forEach((ob) => ob.render());
    this.line ? this.line.render() : '';
  }
}
