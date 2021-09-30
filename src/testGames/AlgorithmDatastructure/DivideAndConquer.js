// binary search

// binary search in a SORTED array ASC order
function binarySearch(arr, val) {
  let first = 0;
  let last = arr.length - 1;

  while (first <= last) {
    let middle = Math.floor((first + last) / 2);
    let currentEl = arr[middle];

    if (val > currentEl) first = middle + 1;
    else if (val < currentEl) last = middle - 1;
    else return middle;
  }
}

// console.log(binarySearch([0, 2, 3, 4, 5, 6, 8, 10, 24, 30, 33], 24));
