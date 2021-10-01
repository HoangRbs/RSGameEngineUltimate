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
