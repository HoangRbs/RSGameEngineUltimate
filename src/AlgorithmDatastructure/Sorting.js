// bubble
function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = arr.length - 1; j > i; j--) {
            if (arr[j] < arr[j - 1]) {
                let tmp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = tmp;
            }
        }
    }

    return arr;
}

// console.log(bubbleSort([4]));

// 2,8,5,3,9,4,1

function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let currentMinimumIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[currentMinimumIndex]) currentMinimumIndex = j;
        }

        let tmp = arr[i];
        arr[i] = arr[currentMinimumIndex];
        arr[currentMinimumIndex] = tmp;
    }

    return arr;
}

// console.log(selectionSort([2, 8, 5, 3, 9, 4, 1]));

function insertionSort(arr) {
    if (arr.length < 2) return arr;

    for (let i = 1; i < arr.length; i++) {
        let currentVal = arr[i];
        for (let j = i - 1; j >= 0; j--) {
            if (currentVal < arr[j]) {
                arr[j + 1] = arr[j];
            } else {
                arr[j + 1] = currentVal;
                break;
            }
        }
    }

    return arr;
}

// console.log(insertionSort([2, 8, 5, 3, 9]));

function mergeSort(arr, left, right) {
    if (left >= right) { // only one element left
        console.log(arr[right]);
        return;
    }

    let middle = left + Math.floor((right - left) / 2);

    mergeSort(arr, left, middle);
    mergeSort(arr, middle + 1, right);

    // arrOne = {left,middle}; arrayTwo = {middle+1,right}
    // return mergeSort(arr, arrOne, arrTwo);
}

// mergeSort([8, 3, 5, 4, 7, 6, 1], 0, 6);

function quickSort(arr) {

}