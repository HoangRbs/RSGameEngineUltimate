import TestGame from ".";

export default class Ball {
    constructor(mGame) {
        this.ball = document.createElement('img');
        this.ball.id = "ball";
        this.ball.src = "./TestGame/images/ball.png";

        this.position = {
            x: 0,
            y: 0
        }

        this.width = 50;
        this.height = 50;

        this.defaultMaxSpeed = 100;
        this.speed = this.defaultMaxSpeed;

        /** @type {TestGame} */
        this.mGame = mGame;
    }

    update(deltaTime) {
        this.position.x += this.speed * deltaTime;
        this.position.y += this.speed * deltaTime;
    }

    render() {
        this.mGame.DrawImage(this.ball, this.position.x, this.position.y, this.width, this.height);
    }
}