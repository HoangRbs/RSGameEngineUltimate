// currently bunch of unrelevant functions that are gonna be refactored in the long future

// get random integer
export function genRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function genRndFloat(min, max) {
  let i = Math.random() * (max - min + 1) + min;
  return i;
}

// get random element from array
export function getRandomEl(arr, arrSize) {
  function genRndInteger2(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let i = genRndInteger2(0, arrSize - 1);
  return arr[i];
}

// The loadBytes() function is used to read the contents of a file or URL
// and return it as an object containing the series of bytes.
// credit: https://github.com/processing/p5.js/issues/2674

export function loadBytes(file) {
  return new Promise((resolve, reject) => {
    // async function
    // var self = this;
    var data = {};
    var oReq = new XMLHttpRequest();
    oReq.open('GET', file, true); // parameter true is async to let the game to continue running
    oReq.responseType = 'arraybuffer';
    oReq.onload = function (oEvent) {
      var arrayBuffer = oReq.response;
      if (arrayBuffer) {
        data.bytes = new Uint8Array(arrayBuffer);
        // if (callback) {
        //   callback(data);
        // }
        // self._decrementPreload();
      }

      resolve(data);
    };
    oReq.send(null);
  });
}

// save bytes as binary data
export function saveBytes(data, fileName) {
  // to create a link with createElement.
  const a = document.createElement('a');

  // if data is a array (bytes array)
  function typedArrayToURL(typedArray, mimeType) {
    // we create a Blob from the data string which has the data to download.
    const blob = new Blob([typedArray.buffer], { type: mimeType });

    // Next, we convert it to a base64 URL string with createObjectURL.
    const url = window.URL.createObjectURL(blob);

    return url;
  }

  // if data is a array (bytes array)
  const url = typedArrayToURL(data, 'text/plain');

  // Then we set the href to the url.
  a.href = url;

  // Next we set the file name of the downloaded file by setting the download property.
  a.download = fileName;

  // Then we call click to download the file.
  a.click();

  // Finally we call revokeObjectURL to clear the URL resource.
  window.URL.revokeObjectURL(url);
}

// ------ example -------------
// saveByteArray(sampleBytes, 'example.bin');
