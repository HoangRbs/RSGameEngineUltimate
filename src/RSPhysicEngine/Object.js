import Vector2D from './core/Vector2D';
import RSGameEngine from '../RSGameEngine';

export default class Object {
  constructor(x, y) {
    this.pos = new Vector2D(0, 0);
    this.vel = new Vector2D(0, 0);
    this.acc = new Vector2D(0, 0);

    // temporary code for testing
    // particle size
    this.width = 20;
    this.height = 20;
    this.color = 'rgba(189, 125, 9, 0.55)';
  }

  applyForce(/** @type {Vector2D} */ force) {
    this.acc.x = force.x;
    this.acc.y = force.y;
  }

  // game object extends this class
  // to move that game object
  /*
  update(deltaTime)
  { 
    this.applyForce(force);
    super.update(deltaTime);
  }
  */
  update(deltaTime) {
    this.vel.add(this.acc, deltaTime);
    this.pos.add(this.vel, deltaTime);
    this.acc.mult(0);
  }

  // game object does not need to implement this function,
  // let the parent do the work
  render(/** @type {RSGameEngine} */ gameEngine) {
    gameEngine.FillRectAndRotate(
      this.pos.x,
      this.pos.y,
      this.width,
      this.height,
      this.vel.headingAngle('radian'),
      this.color
    );
  }
}
