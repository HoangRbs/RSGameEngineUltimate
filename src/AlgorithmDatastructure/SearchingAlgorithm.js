// searching a substring inside a string

// naive approach

// whaellt the hell is this
// ell

function naiveStringSearch(largeS, shortS) {
  let count = 0;

  for (let i = 0; i < largeS.length - shortS.length + 1; i++) {
    for (let j = 0; j < shortS.length; j++) {
      if (shortS[j] !== largeS[i + j]) break;
      if (j === shortS.length - 1) count++;
    }
  }

  return count;
}

// console.log(naiveStringSearch("whaell the hell is this", "ell"));

// KMP STRING SEARCH
