const keys = {
  left: 37,
  right: 39,
};

export default class InputHandler {
  constructor(paddle) {
    document.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
        case keys.left:
          paddle.moveLeft();
          break;
        case keys.right:
          paddle.moveRight();
          break;
      }
    });
  }
}
