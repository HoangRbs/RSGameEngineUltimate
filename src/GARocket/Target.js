import RSGameEngine from "../RSGameEngine";

export default class Target {
    constructor( /** @type {RSGameEngine} */ gameObj) {
        this.mGame = gameObj;
        this.target = document.createElement('img');
        this.target.id = "target";
        this.target.src = "./GARocket/images/destination.png";

        this.width = 30;
        this.height = 30;
    }

    update (deltaTime) {    

    }

    render() {
        this.mGame.DrawImage(this.target, 300, 10, this.width, this.height);
    }
}