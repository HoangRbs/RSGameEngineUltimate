const keys = {
  left: 37,
  right: 39,
  enter: 13,
};

export default class InputHandler {
  constructor(enter_function_callback) {
    document.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
        case keys.left:
          break;
        case keys.right:
          break;
        case keys.enter:
          enter_function_callback();
          break;
      }
    });
  }
}
