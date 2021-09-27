// for instance: input range:  0 ----> 5, and input value is "3"
// if there's an output range: 0 ----> 1, then "3" in that output range = ?
export function scaleNumberInRange(value, startIn, endIn, startOut, endOut) {
  if (endIn <= startIn || endOut <= startOut) {
    throw new Error('endIn must > startIn or endOut must > startOut');
  }

  if (value > endIn || value < startIn) {
    throw new Error('value must >= startIn and <= endIn');
  }

  outValue =
    endOut - (endIn - value) / ((endIn - startIn) / (endOut - startOut));
  return outValue;
}

export function genRndChar() {
  let c = genRndInteger(63, 122);
  if (c === 63) c = 32; // if c is "?" replace it with " "
  if (c === 64) c = 46; // if c is "@" replace it with "."

  return String.fromCharCode(c);
}

// get random integer
export function genRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
