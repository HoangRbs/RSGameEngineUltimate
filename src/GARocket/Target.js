import GA_Rocket from '.';
import Vector2D from './Vector2D';

export default class Target {
  constructor(/** @type {GA_Rocket} */ gameObj) {
    this.mGame = gameObj;
    this.target = document.createElement('img');
    this.target.id = 'target';
    this.target.src = './GARocket/images/destination.png';
    this.pos = new Vector2D(300, 10);

    this.width = 30;
    this.height = 30;
  }

  update(deltaTime) {}

  render() {
    this.mGame.DrawImage(
      this.target,
      this.pos.x,
      this.pos.y,
      this.width,
      this.height
    );
  }
}
