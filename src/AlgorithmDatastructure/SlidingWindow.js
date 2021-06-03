// sliding window pattern

// write a function that calculate max sub array in an array
// [3,2,3,4,45,5,6]


// O(N^2) naive method
function findMaxSum(arr, num) {
    if (arr.length < num) return;
    let max = -Infinity;

    for (let i = 0; i < arr.length - num + 1; i++) {
        let temp = 0;

        for (let j = i; j < i + num; j++) {
            temp += arr[j];
        }

        if (temp > max) max = temp;
    }

    return max;
}

console.log(findMaxSum([3, 2, 3, 4, 45, 5, 6], 2));

// O(N) -- using sliding window technic
function findMaxSum2(arr, num) {
    if (num > arr.length) return;

    let max = 0;
    let tmp = 0;

    for (let i = 0; i < num; i++) {
        max += arr[i];
    }

    tmp = max;

    for (let i = num; i < arr.length; i++) {
        tmp = tmp + arr[i] - arr[i - num];
        max = Math.max(max, tmp);
    }

    return max;
}

console.log(findMaxSum2([3, 2, 3, 4, 45, 5, 6], 3));
