// text display element

export default class TextDisplayEl {
    constructor(text) {
        this.text = text;
        this.textEl = document.createElement('p');
        document.body.prepend(this.textEl);

        this.textEl.innerText = text;
    }

    changeText(text) {
        this.textEl.innerText = text;
    }
}