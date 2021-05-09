
// get random integer
export function genRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}