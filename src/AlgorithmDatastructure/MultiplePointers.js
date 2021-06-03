// mulitple pointers pattern

// sumZero problem
// make a sumZero function that finds the fisrt pair that
// sum = 0 and return that pair from a SORTED (ASC) list
// [-4, -3, -2, 0, 1, 2, 5, 6] --> [-2, 2]

function sumZero(arr) {
    left = 0;
    right = arr.length - 1;

    while (left < right) {
        let sum = arr[left] + arr[right];
        if (sum == 0) {
            return [arr[left], arr[right]];
        }
        else if (sum > 0) {
            right--;
        } else {
            left++;
        }
    }
}

// console.log(sumZero([-4, -3, -2, 0, 1, 5, 6]));


// count Unique values
