'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    main();
});

function count(rating) {
    if (rating.length < 3) {
        return 0;
    }

    const len = rating.length;
    let dpi = new Array(len).fill(0);
    let dpd = new Array(len).fill(0);
    let count = 0;

    for (let i = 0; i < len; i++) {
        for (let j = i; j >= 0; j--) {
            if (rating[i] > rating[j]) {
                dpi[i]++;
                count = count + dpi[j];
            }

            if (rating[i] < rating[j]) {
                dpd[i]++;
                count = count + dpd[j];
            }
        }
    }

    return count;
}

/**
 * Sample Input: 2 5 3 4 1
 * Sample Output: 3
 * Testing environment: JavaScript (Node.js)
 */
function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const rating = inputString.split(' ').map(num => parseInt(num, 10));
    const result = count(rating);

    ws.write(result + "\n");
    ws.end();
}
