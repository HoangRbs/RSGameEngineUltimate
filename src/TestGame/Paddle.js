import TestGame from ".";

export default class Paddle {
    constructor(screenWidth, screenHeight, mGame) {
        this.width = 200;
        this.height = 30;

        this.position = {
            x: screenWidth / 2 - this.width / 2,
            y: screenHeight - this.height - 10
        }

        this.constantSpeed = 1000;
        this.speed = 0;

        /** @type {TestGame} */
        // for test game intellisense
        this.mGame = mGame;
    }

    moveLeft() {
        this.speed = -this.constantSpeed;
    }

    moveRight() {
        this.speed = this.constantSpeed;
    }

    update(deltaTime) {
        this.position.x += this.speed * deltaTime;
        this.speed = 0;
    }

    render() {
        this.mGame.FillRect(this.position.x, this.position.y, this.width, this.height);
    }
}