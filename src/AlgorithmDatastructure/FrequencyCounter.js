// Frequency counter problem patterns

// ---------------------- build a same function that meets the requirements ---------------------
// same([1,2,3], [9,1,4]) --> true
// same([1,3,2], [9,4]) --> false
// same([1,3,2], [1,4,4]) --> false

// naive method O(N^2)
function same1(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
        let correctIndex = -1;

        for (let j = 0; j < arr2.length; j++) {
            if (arr1[i] ** 2 == arr2[j]) {
                correctIndex = j;
            }
        }

        if (correctIndex == -1) return false;

        arr2.splice(correctIndex, 1);
    }
    return true;
}

// console.log(same1([1, 2, 3], [9, 1, 4]));

// faster time O(N) using frequency counter
function same2(arr1, arr2) {
    if (arr1.length != arr2.length) return false;

    let frequencyCounter1 = {};
    let frequencyCounter2 = {};

    for (let val of arr1) {
        frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1;
    }

    for (let val of arr2) {
        frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1;
    }

    for (let key in frequencyCounter1) {
        if (!(key ** 2 in frequencyCounter2)) return false;
        if (frequencyCounter1[key] !== frequencyCounter2[key ** 2]) return false;
    }

    return true;
}

// console.log(same2([1, 2, 3, 2], [9, 1, 4, 4]));

// ---------------------------------------------------------------------------------

// ANAGRAMS PROBLEM ---------------------------------------------------------
// given 2 strings, determine if determine if the second string is 
// an anagram of the first
// an ANAGRAM is a word, phrase, name formed by rearranging the letters of another
// for instance: "cinema" is formed from "iceman"

// validAnagram(' ', ' ') --> true
// validAnagram('aaz', 'zza') --> false;
// validAnagram('anagram', 'nagaram'); --> true

function validAnagram(string1, string2) {
    if (string1.length !== string2.length) return false;

    const lookup = {};

    for (let letter of string1) {
        lookup[letter] = (lookup[letter] || 0) + 1;
    }

    for (let letter of string2) {
        if (!lookup[letter]) return false;      // 0 is also a falsy situation
        else lookup[letter] -= 1;
    }

    return true;
}

console.log(validAnagram('cinema', 'iceman'));

// --------------------------------------------------------------------------