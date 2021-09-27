// resursion helper method

function collectOddValues(arr) {
  let result = [];

  // helper method that helps collect the odd
  function helper(inputArr) {
    if (!inputArr.length) return;

    if (inputArr[0] % 2 !== 0) {
      result.push(inputArr[0]);
    }

    helper(inputArr.slice(1));
  }

  helper(arr);

  return result;
}

// console.log(collectOddValues([3, 9, 1, 2, 4, 7]));

// pure recursion -----------------------------

function collectOddValues2(arr) {
  let newArr = [];

  if (!arr.length) return;

  if (arr[0] % 2 !== 0) {
    newArr.push(arr[0]);
  }

  newArr = newArr.concat(collectOddValues2(arr.slice(1)));
  return newArr;
}

// console.log(collectOddValues([3, 9, 1, 2, 4, 7]));
