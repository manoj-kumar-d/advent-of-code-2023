const fs = require('fs');
const os = require('os');

fs.readFile('test_data.txt', (err, data) => {
    const input = data.toString();
    const inputArray = input.split(os.EOL);

    const testSolution = puzzleTwoSolution(inputArray);

    console.log("Test solution --> " + testSolution);
});

fs.readFile('input.txt', (err, data) => {
    const input = data.toString();
    const inputArray = input.split(os.EOL);

    const solutionOne = inputArray
        .map(inputString => [...inputString].filter(item => !isNaN(item)))
        .map(inputNumbers => Number(inputNumbers.at(0)+inputNumbers.at(inputNumbers.length-1)))
        .reduce((accumulator, currentValue) => {
            return accumulator+currentValue;
        }, 0);
    console.log("Puzzle 1 --> " + solutionOne);

    const solutionTwo = puzzleTwoSolution(inputArray);

    console.log("Puzzle 2 --> " + solutionTwo);
});

function puzzleTwoSolution(inputArray) {
    return inputArray
        .map(inputString => {
            const newVar = [...inputString];
            return newVar.reduce((acc, curr, index, newVar) => {

                acc = acc + curr;
                acc = acc.replace('one', '1');
                acc = acc.replace('two', '2');
                acc = acc.replace('three', '3');
                acc = acc.replace('four', '4');
                acc = acc.replace('five', '5');
                acc = acc.replace('six', '6');
                acc = acc.replace('seven', '7');
                acc = acc.replace('eight', '8');
                acc = acc.replace('nine', '9');

                if (index === newVar.length - 1) {
                    const numbers = [...acc]
                        .filter(item => !isNaN(item));
                    let digit = numbers.at(0) + numbers.at(numbers.length - 1);
                    // console.log(inputString, acc, digit);
                    return Number(digit);
                }

                return acc;
            }, '');
        })
        .reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0);
}