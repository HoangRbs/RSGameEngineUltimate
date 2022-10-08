import { loadBytes, saveBytes } from '../../utils';

const imgSize = 28; // square image
const pixelsPerImg = imgSize * imgSize; // total number of pixels per image = 28 * 28 = 784;

// --------------- usage example: -----------------------
// createTrainingDatas(
//   './testGames/DoodleClassification/datas/cat_hand_draw_bitmap.npy',
//   'cat_hand_draw.bin'
// );

// createTrainingDatas(
//   './testGames/DoodleClassification/datas/rainbow_hand_draw_bitmap.npy',
//   'rainbow_hand_draw.bin'
// );

// main function to load and extract datas.
export async function createTrainingDatas(inputFilePath, outputFileName) {
  let inputImageDatas = [];
  ({ bytes: inputImageDatas } = await loadBytes(inputFilePath));

  let total = 1000; // get 1000 images from thousand hundred of images from the original data (bytes array).
  let resultImagesData = new Int8Array(total * 784); // store as byte value to minimize the storage -128 -> 127
  let resultIndex = 0;

  for (let n = 0; n < total; n++) {
    // each 28x28 image in the bytes array is 784 array length
    // and the .npy file structure has the first 80 bytes that are not images, they're just some meta information of the images
    let startBytesIndex = 80 + n * 784;

    // writing each 28x28 image data from bytes array
    for (let i = 0; i < 784; i++) {
      let byteArrIndex = i + startBytesIndex;
      let val = inputImageDatas[byteArrIndex];

      resultImagesData[resultIndex] = val;
      resultIndex++;
    }
  }

  saveBytes(resultImagesData, outputFileName);
}

// to test display 100 cat images on canvas only.
// for testing display -------------------

// --------------- usage example: -----------------------
// loadTrainingDatasTestDisplay(returnData => {
//     console.log(returnData);
// }, './testGames/DoodleClassification/datas/cat_hand_draw_bitmap.npy');

// loadTrainingDatasTestDisplay(returnData => {
//     console.log(returnData);
// }, './testGames/DoodleClassification/datas/rainbow_hand_draw_bitmap.npy');

// loadTrainingDatasTestDisplay(returnData => {
//     console.log(returnData);
// }, './testGames/DoodleClassification/extractedDatas/cats.bin');

export async function loadTrainingDatasTestDisplay(
  testDataCallback,
  inputFilePath
) {
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');

  // --------------- get images from data -------------------
  let inputImageDatas = [];
  let resultImages = [];

  const fileExtension = inputFilePath.split('.').pop();

  // the 'npy' file is a input file structure related to python and has some different structures compared to other files
  if (fileExtension === 'npy') {
    ({ bytes: inputImageDatas } = await loadBytes(inputFilePath));

    console.log('total of input images', (inputImageDatas.length - 80) / 784); // number of total images of size 28x28.

    let total = 100; // get 100 images from thousand hundred of images from the original data (bytes array).

    for (let n = 0; n < total; n++) {
      // each 28x28 image in the bytes array is 784 array length
      // and the .npy file structure has the first 80 bytes that are not images, they're just some meta information of the images
      let startBytesIndex = 80 + n * 784;

      let oneImage = ctx.createImageData(28, 28);
      // each pixel of oneImage is an array of 4 elements RGBA
      // console.log('oneImage number of pixels: ' , oneImage.data.length / 4);

      // writing each 28x28 image data from bytes array into the oneImage data
      for (let i = 0; i < 784; i++) {
        let byteArrIndex = i + startBytesIndex;
        let val = 255 - inputImageDatas[byteArrIndex]; // 255 - val means change from white line to black line and white background.

        let oneImageIndex = i * 4; // each i * 4 is the start index of one pixel of oneImage (js imageData)
        oneImage.data[oneImageIndex + 0] = val; // R value
        oneImage.data[oneImageIndex + 1] = val; // G value
        oneImage.data[oneImageIndex + 2] = val; // B value
        oneImage.data[oneImageIndex + 3] = 255; // A value
      }

      resultImages.push({
        imageData: oneImage,
        x: 28 * (n % 10),
        y: 28 * Math.floor(n / 10),
      }); // save 28x28 images with their coordinate for displaying (testing)
    }
  } else {
    // it can be .bin file

    ({ bytes: inputImageDatas } = await loadBytes(inputFilePath));

    console.log('total of input images', inputImageDatas.length / 784); // number of total images of size 28x28.

    let total = 100; // get 100 images from thousand hundred of images from the original data (bytes array).

    for (let n = 0; n < total; n++) {
      // each 28x28 image in the bytes array is 784 array length
      // and the .npy file structure has the first 80 bytes that are not images, they're just some meta information of the images
      let startBytesIndex = n * 784;

      let oneImage = ctx.createImageData(28, 28);
      // each pixel of oneImage is an array of 4 elements RGBA
      // console.log('oneImage number of pixels: ' , oneImage.data.length / 4);

      // writing each 28x28 image data from bytes array into the oneImage data
      for (let i = 0; i < 784; i++) {
        let byteArrIndex = i + startBytesIndex;
        let val = 255 - inputImageDatas[byteArrIndex]; // 255 - val means change from white line to black line and white background.

        let oneImageIndex = i * 4; // each i * 4 is the start index of one pixel of oneImage (js imageData)
        oneImage.data[oneImageIndex + 0] = val; // R value
        oneImage.data[oneImageIndex + 1] = val; // G value
        oneImage.data[oneImageIndex + 2] = val; // B value
        oneImage.data[oneImageIndex + 3] = 255; // A value
      }

      resultImages.push({
        imageData: oneImage,
        x: 28 * (n % 10),
        y: 28 * Math.floor(n / 10),
      }); // save 28x28 images with their coordinate for displaying (testing)
    }
  }

  testDataCallback(resultImages);
}

// --------------- usage example: -----------------------
// const datas = loadTrainingDatas('./testGames/DoodleClassification/extractedDatas/train_hand_draw.bin');
export async function loadTrainingDatas(inputFilePath) {
  const { bytes: datas } = await loadBytes(inputFilePath);
  return datas;
}
