const fs = require('fs');
const os = require('os');

function checkThisRow(row, startColumnNo, endColumnNo) {
    return (row[startColumnNo-1] && row[startColumnNo-1] !== '.') || (row[endColumnNo] && row[endColumnNo] !== '.');
}

function checkRow(row, startColumnNo, endColumnNo) {
    return row.slice(startColumnNo-1 > 0 ? startColumnNo-1 : 0, endColumnNo+1).some(value => value && value !== '.' && isNaN(value));
}

function validateSurroundings(matrix, rowNo, startColumnNo, endColumnNo) {
 if (rowNo === 0) {
     return checkThisRow(matrix[rowNo], startColumnNo, endColumnNo) ||
         checkRow(matrix[rowNo+1], startColumnNo, endColumnNo);
 } else if (rowNo === matrix.length-1) {
     return checkThisRow(matrix[rowNo], startColumnNo, endColumnNo) ||
         checkRow(matrix[rowNo-1], startColumnNo, endColumnNo);
 } else {
     if (rowNo === 65) {
         console.log(checkRow(matrix[rowNo+1], startColumnNo, endColumnNo))
     }
     return checkThisRow(matrix[rowNo], startColumnNo, endColumnNo) ||
         checkRow(matrix[rowNo-1], startColumnNo, endColumnNo) ||
         checkRow(matrix[rowNo+1], startColumnNo, endColumnNo);
 }
}

fs.readFile('input.txt', (err, data) => {
    const input = data.toString();
    const rows = input.split(os.EOL);

    const matrix = rows
        .map(row => [...row]);

    let result = 0;
    const validNos = [];
    for (let rowNo=0; rowNo < matrix.length; rowNo++) {
        const row = matrix[rowNo];

        let acc = '';
        let startColumnNo = 0;
        let endColumnNo = 0;

        let validate = false;

        for(let columnNo = 0; columnNo < row.length; columnNo++) {

            let value = matrix[rowNo][columnNo];

            if (!isNaN(value)) {
                acc+=value;
                endColumnNo++;
                validate = true;
                if (columnNo !== row.length-1) {
                    continue;
                }
            }

            let valid = validate && validateSurroundings([...matrix], rowNo, startColumnNo, endColumnNo);
            if(valid) {
                validNos.push(Number(acc));
                result += Number(acc);
            }
            acc='';
            startColumnNo=columnNo+1;
            endColumnNo=columnNo+1;
            validate=false;
        }
    }
    console.log(validNos.filter(x=>x===727));
    console.log('final -->' + result);
    console.log('expected -> 526404');
});