import RSGameEngine from '../../RSGameEngine';
import {
  loadTrainingDatasTestDisplay,
  createTrainingDatas,
  loadTrainingDatas,
} from './createTrainingDatas';

import RSNeuralNetwork from '../../RSNeuralNetwork/RSNeuralNetwork';
import { shuffleArray } from '../../utils';
import CanvasDrawApp from './canvasDrawApp';
import TextDisplayEl from './TextDisplayEl';

// just for guessing, labeling
// --> target design:
// cat --> [1, 0, 0], clock --> [0, 1, 0]
// used in prepareCategory()
const CAT = 0;
const CLOCK = 1;
const TRAIN = 2;

const label_nums = {
  0: 'it is a CAT!',
  1: 'it is a CLOCK!',
  2: 'it is a TRAIN!',
};

export default class DoodleClassification extends RSGameEngine {
  constructor() {
    super();
    this.m_gameObject = []; // for updating and rendering all kind of objects

    // for testing display -------------------
    // this.testDisplayImageDatas = null;

    // prepare datas (cats, trains, clocks are categories)
    // cats.training[[], [], []] ; cats.testing[[], [], []]
    // each [] is an array of 784 pixels which is a 28*28 image
    this.cats = { training: [], testing: [] };
    this.clocks = { training: [], testing: [] };
    this.trains = { training: [], testing: [] };

    this.m_neuralNetwork = new RSNeuralNetwork(784, 70, 3);
    this.isTraining = false;

    // we'll not gonna use the main game canvas, which always refresh for new frames
    this.m_canvasDrawApp = new CanvasDrawApp();

    // text display: not a gameObject, prepend to html when created
    this.guessLabelDisplay = new TextDisplayEl('it is a ...');
    this.trainingDisplay = new TextDisplayEl('');
  }

  importGameObjects() {}

  prepareUserInterface() {
    // user interface
    this.trainButton = document.createElement('button');
    this.trainButton.innerText = 'train 5 epoch';
    this.trainButton.style.fontSize = '30px';
    this.trainButton.style.marginRight = '10px';

    this.testButton = document.createElement('button');
    this.testButton.innerText = 'test all datas';
    this.testButton.style.fontSize = '30px';
    this.testButton.style.marginRight = '10px';

    this.guessButton = document.createElement('button');
    this.guessButton.innerText = 'guess drawing';
    this.guessButton.style.fontSize = '30px';

    this.buttonWrapper = document.createElement('div');
    this.buttonWrapper.style.marginBottom = '5px';
    this.buttonWrapper.appendChild(this.trainButton);
    this.buttonWrapper.appendChild(this.testButton);
    this.buttonWrapper.appendChild(this.guessButton);

    // wait for the whole html to load
    window.addEventListener('load', () => {
      document.body.insertBefore(this.buttonWrapper, this.m_canvas);

      // we'll not gonna use the main game canvas, which always refresh for new frames
      this.m_canvas.style.display = 'none';
    });
  }

  // function to load training datas --------------------
  async prepareDatas() {
    const cats_data = await loadTrainingDatas(
      './testGames/DoodleClassification/extractedDatas/cat_hand_draw.bin'
    );

    const clock_datas = await loadTrainingDatas(
      './testGames/DoodleClassification/extractedDatas/clock_hand_draw.bin'
    );

    const train_datas = await loadTrainingDatas(
      './testGames/DoodleClassification/extractedDatas/train_hand_draw.bin'
    );

    this.prepareCategory(this.cats, cats_data, CAT);
    this.prepareCategory(this.clocks, clock_datas, CLOCK);
    this.prepareCategory(this.trains, train_datas, TRAIN);

    // console.log(this.cats);
    // console.log(this.trains);
    // console.log(this.clocks);
  }

  // category: this.cats, this.trains, this.clocks
  prepareCategory(category, loadedData, label) {
    // cat, train and clock, these kind of datas should have the same array length OR totalImages
    const totalImages = loadedData.length / 784;
    const trainingThreshold = Math.floor(totalImages * 0.8); // training ratio = 80% of total datas.

    for (let i = 0; i < totalImages; i++) {
      // to 1000 images
      let startIndex = i * 784;
      if (i < trainingThreshold) {
        // push the 28*28 image which has array of 784 pixels
        category.training[i] = loadedData.subarray(
          startIndex,
          startIndex + 784
        );

        category.training[i].label = label;
      } else {
        // push the 28*28 image which has array of 784 pixels
        category.testing[i - trainingThreshold] = loadedData.subarray(
          startIndex,
          startIndex + 784
        );

        category.testing[i - trainingThreshold].label = label;
      }
    }
  }

  // training the datas
  trainEpoch(trainingArr) {
    this.trainingDisplay.changeText('training ...');

    setTimeout(() => {
      // shuffle the datas - so the inputs into the network are random
      shuffleArray(trainingArr);

      // training for 5 epoch
      for (let k = 0; k < 3; k++) {
        // training for one epoch
        // epoch means training for all the elements in the training array at one time
        // which is 800 * 3 = 2400 images.
        for (let i = 0; i < trainingArr.length; i++) {
          let currentImageArr = trainingArr[i];
          // neural network inputs
          // normalize the inputs between 0 --> 1
          // since image pixels are 0 --> 255
          let nn_inputs = currentImageArr.map((x) => x / 255.0);

          // neural network targets
          let nn_targets = [0, 0, 0];
          let currentImageLabel = currentImageArr.label;
          nn_targets[currentImageLabel] = 1;

          this.m_neuralNetwork.train(nn_inputs, nn_targets);
        }

        this.epochCounter++;
        console.log(`training epoch: ${this.epochCounter}`);
      }
      console.log(`complete training.`);
      this.trainingDisplay.changeText('');
    }, 0); // wait for 1 sec before setting change text since the for loop will block the web
  }

  // predict testing array
  testAll(testingArr) {
    let totalTestCorrect = 0;

    for (let i = 0; i < testingArr.length; i++) {
      let currentImageArr = testingArr[i];
      // neural network inputs
      // normalize the inputs between 0 --> 1
      // since image pixels are 0 --> 255
      let nn_inputs = currentImageArr.map((x) => x / 255.0);

      // predict
      let nn_guess = this.m_neuralNetwork.feedForward(nn_inputs);

      // neural network targets
      let currentImageLabel = currentImageArr.label;

      // get the index of max value in guess array, the value the neural network guessed
      let maxVal = Math.max(...nn_guess);
      let guessLable = nn_guess.indexOf(maxVal);

      //   console.log('guess label: ', guessLable);
      //   console.log('target label: ', currentImageLabel);
      if (guessLable === currentImageLabel) totalTestCorrect++;
    }

    let correctPercent = (totalTestCorrect / testingArr.length) * 100;
    return correctPercent;
  }

  // guess the drawing
  guessDrawing() {
    let nn_inputs = []; // neural net work input
    let imgData = this.m_canvasDrawApp.getResizedImageData(); // [...]

    // In js image data, each pixel is a 4 elements RGBA next to each other --> so we just need to get the R value
    // so the number of pixels in an image data = it's length / 4, in this case is 784
    for (let i = 0; i < 784; i++) {
      let val = imgData[i * 4];
      nn_inputs[i] = (255 - val) / 255.0; // normalize the inputs between 0 --> 1
    }

    // console.log(nn_inputs);

    // predict
    let nn_guess = this.m_neuralNetwork.feedForward(nn_inputs);

    // get label
    let maxVal = Math.max(...nn_guess);
    let guessLable = nn_guess.indexOf(maxVal);

    this.guessLabelDisplay.changeText(label_nums[guessLable]);
  }

  OnCreate() {
    this.importGameObjects();

    // just run this code only when you need to create new datas
    // most of the time you need to comment this code

    // for testing display -------------------
    // loadTrainingDatasTestDisplay((returnData) => {
    //   this.testDisplayImageDatas = returnData;
    // }, './testGames/DoodleClassification/extractedDatas/train_hand_draw.bin');

    // loadTrainingDatasTestDisplay(returnData => {
    //     this.testDisplayImageDatas = returnData;
    //     console.log(returnData);
    // }, './testGames/DoodleClassification/datas/cat_hand_draw_bitmap.npy');

    // ----------- main functions to create training datas -------------------------
    // most of the time you need to comment this code
    // only enable when you need to create a new data
    // there will be a file downloaded in the browser
    // copy that file into our project
    // public/testGames/DoodleClassification/extractedDatas folder (build it first)
    // if you don't see a file download, press F5 to refresh the browser.

    // createTrainingDatas(
    //     './testGames/DoodleClassification/datas/cat_hand_draw_bitmap.npy',
    //     'cat_hand_draw.bin'
    // );

    // createTrainingDatas(
    //     './testGames/DoodleClassification/datas/clock_hand_draw_bitmap.npy',
    //     'clock_hand_draw.bin'
    // );

    // createTrainingDatas(
    //     './testGames/DoodleClassification/datas/train_hand_draw_bitmap.npy',
    //     'train_hand_draw.bin'
    // );

    this.prepareUserInterface();

    this.prepareDatas().then(() => {
      // gather all training datas
      let training = [];
      training = training.concat(this.cats.training);
      training = training.concat(this.clocks.training);
      training = training.concat(this.trains.training);

      // gather all testing datas
      let testing = [];
      testing = testing.concat(this.cats.testing);
      testing = testing.concat(this.clocks.testing);
      testing = testing.concat(this.trains.testing);

      this.epochCounter = 0;
      this.trainButton.onclick = () => {
        this.trainEpoch(training);
      };

      this.testButton.onclick = () => {
        let correctPercent = this.testAll(testing);
        console.log(
          `testing datas correct percentage: ${correctPercent.toFixed(2)} %`
        );
      };

      this.guessButton.onclick = () => {
        this.guessDrawing();
      };
    });
  }

  Update(deltaTime) {
    // this.gameObjects.forEach((ob) => ob.update(deltaTime));
  }

  Render() {
    // this.gameObjects.forEach((ob) => ob.render());
    // for testing display -------------------
    // if (this.testDisplayImageDatas) {
    //   for (let i = 0; i < this.testDisplayImageDatas.length; i++) {
    //     this.PutImageData(
    //       this.testDisplayImageDatas[i].imageData,
    //       this.testDisplayImageDatas[i].x,
    //       this.testDisplayImageDatas[i].y
    //     );
    //   }
    // }
  }
}
