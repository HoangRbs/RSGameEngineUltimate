import RSGameEngine from '../../RSGameEngine';
import {
  loadTrainingDatasTestDisplay,
  createTrainingDatas,
  loadTrainingDatas,
} from './createTrainingDatas';

import RSNeuralNetwork from '../../RSNeuralNetwork/RSNeuralNetwork';
import { shuffleArray } from '../../utils';

// just for guessing, labeling
// --> target design:
// cat --> [1, 0, 0], rainbow --> [0, 1, 0]
const CAT = 0;
const RAINBOW = 1;
const TRAIN = 2;

export default class DoodleClassification extends RSGameEngine {
  constructor() {
    super();
    this.m_gameObject = []; // for updating and rendering all kind of objects

    // for testing display -------------------
    // this.testDisplayImageDatas = null;

    // prepare datas (cats, trains, rainbows are categories)
    // cats.training[[], [], []] ; cats.testing[[], [], []]
    // each [] is an array of 784 pixels which is a 28*28 image
    this.cats = { training: [], testing: [] };
    this.rainbows = { training: [], testing: [] };
    this.trains = { training: [], testing: [] };

    this.m_neuralNetwork = new RSNeuralNetwork(784, 64, 3);
    this.isTraining = false;
  }

  importGameObjects() {}

  prepareUserInterface() {
    // user interface
    this.trainButton = document.createElement('button');
    this.trainButton.innerText = 'train epoch';
    this.trainButton.setAttribute('display', 'block');
    this.trainButton.style.fontSize = '30px';
    this.trainButton.style.marginRight = '10px';

    this.testButton = document.createElement('button');
    this.testButton.innerText = 'test';
    this.testButton.setAttribute('display', 'block');
    this.testButton.style.fontSize = '30px';
    this.testButton.style.marginRight = '10px';

    this.guessButton = document.createElement('button');
    this.guessButton.innerText = 'guess';
    this.guessButton.setAttribute('display', 'block');
    this.guessButton.style.fontSize = '30px';

    this.buttonWrapper = document.createElement('div');
    this.buttonWrapper.style.marginBottom = '5px';
    this.buttonWrapper.appendChild(this.trainButton);
    this.buttonWrapper.appendChild(this.testButton);
    this.buttonWrapper.appendChild(this.guessButton);

    // wait for the whole html to load
    window.addEventListener('load', () => {
      document.body.insertBefore(this.buttonWrapper, this.m_canvas);
    });
  }

  // function to load training datas --------------------
  async prepareDatas() {
    const cats_data = await loadTrainingDatas(
      './testGames/DoodleClassification/extractedDatas/cat_hand_draw.bin'
    );

    const rainbow_datas = await loadTrainingDatas(
      './testGames/DoodleClassification/extractedDatas/rainbow_hand_draw.bin'
    );

    const train_datas = await loadTrainingDatas(
      './testGames/DoodleClassification/extractedDatas/train_hand_draw.bin'
    );

    this.prepareCategory(this.cats, cats_data, CAT);
    this.prepareCategory(this.rainbows, rainbow_datas, RAINBOW);
    this.prepareCategory(this.trains, train_datas, TRAIN);

    // console.log(this.cats);
    // console.log(this.trains);
    // console.log(this.rainbows);
  }

  // category: this.cats, this.trains, this.rainbows
  prepareCategory(category, loadedData, label) {
    // cat, train and rainbow, these kind of datas should have the same array length OR totalImages
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
    console.log('training....');

    // shuffle the datas - so the inputs into the network are random
    shuffleArray(trainingArr);

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
    //     './testGames/DoodleClassification/datas/rainbow_hand_draw_bitmap.npy',
    //     'rainbow_hand_draw.bin'
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
      training = training.concat(this.rainbows.training);
      training = training.concat(this.trains.training);

      // gather all testing datas
      let testing = [];
      testing = testing.concat(this.cats.testing);
      testing = testing.concat(this.rainbows.testing);
      testing = testing.concat(this.trains.testing);

      //   console.log('training.....');

      //   for (let i = 1; i < 6; i++) {
      //     // training
      //     this.trainEpoch(training);
      //     console.log(`trained epoch: ${i}`);
      //     // testing
      //     let correctPercent = this.testAll(testing);
      //     console.log(`testing datas correct percentage: ${correctPercent} %`);
      //   }
      // wait for the whole html to load

      let epochCounter = 0;
      this.trainButton.onclick = () => {
        this.trainEpoch(training);
        epochCounter++;
        console.log(`complete training - Epoch: ${epochCounter}`);
      };

      this.testButton.onclick = () => {
        let correctPercent = this.testAll(testing);
        console.log(
          `testing datas correct percentage: ${correctPercent.toFixed(2)} %`
        );
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
