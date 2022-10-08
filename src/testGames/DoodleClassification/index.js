import RSGameEngine from '../../RSGameEngine';
import {
  loadTrainingDatasTestDisplay,
  createTrainingDatas,
  loadTrainingDatas,
} from './createTrainingDatas';

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
    this.trains = { training: [], testing: [] };
    this.rainbows = { training: [], testing: [] };
  }

  importGameObjects() {}

  // function to load training datas --------------------
  async prepareDatas() {
    const cats_data = await loadTrainingDatas(
      './testGames/DoodleClassification/extractedDatas/cat_hand_draw.bin'
    );

    const train_datas = await loadTrainingDatas(
      './testGames/DoodleClassification/extractedDatas/train_hand_draw.bin'
    );
    const rainbow_datas = await loadTrainingDatas(
      './testGames/DoodleClassification/extractedDatas/rainbow_hand_draw.bin'
    );

    this.prepareCategory(this.cats, cats_data);
    this.prepareCategory(this.trains, train_datas);
    this.prepareCategory(this.rainbows, rainbow_datas);

    // console.log(this.cats);
    // console.log(this.trains);
    // console.log(this.rainbows);
  }

  // category: this.cats, this.trains, this.rainbows
  prepareCategory(category, loadedData) {
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
      } else {
        // push the 28*28 image which has array of 784 pixels
        category.testing[i - trainingThreshold] = loadedData.subarray(
          startIndex,
          startIndex + 784
        );
      }
    }
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

    // function to create training datas -------------------------
    // most of the time you need to comment this code
    // only enobale when you need to create a new data
    // there will be a file downloaded in the browser
    // copy that file into our project
    // public/testGames/DoodleClassification/extractedDatas folder (build it first)
    // if you see a file download, press F5 to refresh the browser.

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

    this.prepareDatas();
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
