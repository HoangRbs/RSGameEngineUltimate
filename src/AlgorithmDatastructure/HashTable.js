
class HashTable {
    constructor(size = 50) {
        this.keyMap = new Array(size);
    }

    // return the index inside the KEY MAP array , index always < arrayLength
    _hash(key) {
        let total = 0;

        // key words: why use prime number in hash function
        let prime_number = 31;
        // sum of alphabet order of each char inside key
        for (let char of key) {
            let alphabetOrder = char.charCodeAt(0) - 96;
            total = (total * prime_number + alphabetOrder) % this.keyMap.length;    // only use Length if it use new Array
        }

        return total;
    }

    set(key, value) {
        let index = this._hash(key);
        if (!this.keyMap[index]) {
            this.keyMap[index] = new Array();
        }

        let isKeyExist = false;
        for (let i = 0; i < this.keyMap[index].length; i++) {
            if (this.keyMap[index][i][0] === key) {
                isKeyExist = true;
                this.keyMap[index][i][1] = value;
                break;
            }
        }
        if (!isKeyExist) this.keyMap[index].push([key, value]);
    }

    get(key) {
        let index = this._hash(key);
        if (this.keyMap[index]) {
            for (let i = 0; i < this.keyMap[index].length; i++) {
                if (this.keyMap[index][i][0] === key) {
                    return this.keyMap[index][i][1];
                }
            }
        }
        return undefined;
    }
}

let ht = new HashTable();
ht.set("key1", "hello");
ht.set("key2", "hello2");
console.log(ht.get("key2"));