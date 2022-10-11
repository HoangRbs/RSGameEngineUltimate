// making a new canvas, since the main game canvas is always clear to render new frame

export default class CanvasDrawApp {
  constructor() {
    this.canvas;
    this.canvasImg;
    /** @type {CanvasRenderingContext2D} */
    this.ctx;
    this.flag = false;
    this.prevX = 0;
    this.currX = 0;
    this.prevY = 0;
    this.currY = 0;
    this.dot_flag = false;
    this.saveButton;
    this.clearButton;

    this.backGroundColor = 'white';
    this.drawLineColor = 'black';

    // 448 = 28 * 16 --> might help with the sharpness of pixel after scale
    this.WIDTH = 476;
    this.HEIGHT = 476;

    this.init();
  }

  init() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    // canvas
    this.canvas.id = 'canvasdrawapp'; // not game canvas that render frames per sec.
    this.canvas.width = this.WIDTH;
    this.canvas.height = this.HEIGHT;

    this.canvas.style = 'position:absolute;border:2px solid;';

    this.ctx.fillStyle = this.backGroundColor; // background
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // image on canvas
    this.canvasImg = document.createElement('img');
    this.canvasImg.id = 'canvasimg';
    this.canvasImg.style = 'display:none;';

    // save button
    // this.saveButton = document.createElement('button');
    // this.saveButton.innerText = 'save image';
    // this.saveButton.style.fontSize = '30px';
    // this.saveButton.style.marginRight = '10px';
    // this.saveButton.onclick = () => {
    //   this.save();
    // };

    // clear button
    this.clearButton = document.createElement('button');
    this.clearButton.innerText = 'clear drawing';
    this.clearButton.style.fontSize = '30px';
    this.clearButton.style.marginRight = '10px';
    this.clearButton.onclick = () => {
      this.erase();
    };

    // button wrapper
    let buttonWrapper = document.createElement('div');
    buttonWrapper.style.marginBottom = '5px';
    // buttonWrapper.appendChild(this.saveButton);
    buttonWrapper.appendChild(this.clearButton);

    // save into body
    document.body.prepend(this.canvas);
    document.body.prepend(this.canvasImg);
    document.body.prepend(buttonWrapper);

    // mouse event
    this.canvas.addEventListener(
      'mousemove',
      (e) => {
        this.findxy('move', e);
      },
      false
    );
    this.canvas.addEventListener(
      'mousedown',
      (e) => {
        this.findxy('down', e);
      },
      false
    );
    this.canvas.addEventListener(
      'mouseup',
      (e) => {
        this.findxy('up', e);
      },
      false
    );
    this.canvas.addEventListener(
      'mouseout',
      (e) => {
        this.findxy('out', e);
      },
      false
    );
  }

  erase() {
    // let m = confirm('Want to clear');
    // if (m) {
    this.ctx.fillStyle = this.backGroundColor; // background
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    document.getElementById('canvasimg').style.display = 'none';
    // }
  }

  // get image data from the drawing on the canvas - resized means 28 x 28
  getResizedImageData() {
    // --------- get image from the main canvas and demo display -----------------
    // this.canvasImg.style.border = '2px solid';
    // let dataURL = this.canvas.toDataURL();
    // this.canvasImg.src = dataURL;
    // this.canvasImg.style.display = 'inline';
    // this.canvasImg.width = 100;
    // this.canvasImg.height = 100;

    // ---------- get image data from the main canvas ------------
    // resize drawing on original canvas to 28 x 28 (small canvas)
    let bigCanvas = this.canvas; // original canvas

    let smallCanvas = document.createElement('canvas');
    smallCanvas.width = 28;
    smallCanvas.height = 28;
    let smallCtx = smallCanvas.getContext('2d');

    // draw full size image from original canvas --> 28 x 28 smallCanvas
    smallCtx.imageSmoothingEnabled = false; // to retain the pixel sharpness
    smallCtx.scale(28 / bigCanvas.width, 28 / bigCanvas.height);
    smallCtx.drawImage(bigCanvas, 0, 0);

    // document.body.append(smallCanvas); // test display

    let smallImgData = smallCtx.getImageData(
      0,
      0,
      smallCanvas.width,
      smallCanvas.height
    ).data;
    return smallImgData;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.prevX, this.prevY);
    this.ctx.lineTo(this.currX, this.currY);
    this.ctx.strokeStyle = this.drawLineColor;
    this.ctx.lineWidth = 14;
    this.ctx.lineCap = 'round';
    this.ctx.fill;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  findxy(res, e) {
    if (res == 'down') {
      this.prevX = this.currX;
      this.prevY = this.currY;
      this.currX = e.clientX - this.canvas.offsetLeft;
      this.currY = e.clientY - this.canvas.offsetTop;

      this.flag = true;
      this.dot_flag = true;

      if (this.dot_flag) {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.drawLineColor;
        this.ctx.fillRect(this.currX - 3, this.currY - 3, 5, 5);
        this.ctx.closePath();
        this.dot_flag = false;
      }
    }
    if (res == 'up' || res == 'out') {
      this.flag = false;
    }
    if (res == 'move') {
      if (this.flag) {
        this.prevX = this.currX;
        this.prevY = this.currY;
        this.currX = e.clientX - this.canvas.offsetLeft;
        this.currY = e.clientY - this.canvas.offsetTop;
        this.draw();
      }
    }
  }
}
