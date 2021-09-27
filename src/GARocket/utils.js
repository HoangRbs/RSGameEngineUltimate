import Vector2D from './Vector2D';

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

export function distanceOf(
  /** @type {Vector2D} */ pos1,
  /** @type {Vector2D} */ pos2
) {
  let a = pos1.x - pos2.x;
  let b = pos1.y - pos2.y;

  return Math.sqrt(a * a + b * b); // distance in canvas usually 100 -> 600 -> reduce to 10 -> 60
}

// for instance: input range:  0 ----> 5, and input value is "3"
// if there's an output range: 0 ----> 1, then "3" in that output range = ?
export function scaleNumberInRange(valueIn, startIn, endIn, startOut, endOut) {
  if (endIn <= startIn || endOut <= startOut) {
    throw new Error('endIn must > startIn or endOut must > startOut');
  }

  if (valueIn > endIn || valueIn < startIn) {
    throw new Error('value must >= startIn and <= endIn');
  }

  let outValue =
    endOut - (endIn - valueIn) / ((endIn - startIn) / (endOut - startOut));
  return outValue;
}
