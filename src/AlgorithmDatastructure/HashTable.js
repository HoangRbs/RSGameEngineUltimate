
// return the index inside the array , index always < arrayLength
function hash(key, arrayLength) {
    let total = 0;

    // sum of alphabet order of each char inside key
    for (let char of key) {
        let alphabetOrder = char.charCodeAt(0) - 96;
        total = (total + alphabetOrder) % arrayLength;
    }

    return total;
}

console.log(hash("hello", 30));